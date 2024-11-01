::: info 使用 Redis 做缓存，需要解决的四个关键问题：
- Redis 缓存是如何工作的
- Redis 缓存如果满了，应该怎么处理
- 为什么会有缓存一致性、穿透、雪崩、击穿等异常，该如何应对
- Redis 的内存毕竟有限，如果用快速的固态硬盘来保存数据，可以增加缓存的数据量，那么，Redis 缓存可以使用快速固态硬盘吗？
:::

## 缓存的特征

- 缓存的访问速度比磁盘快得多
- 缓存的容量大小比磁盘要小，不可能把所有数据都放到缓存中

## Redis 缓存的工作原理

使用 Redis 当缓存时，有三个基本操作：
- 程序读取数据时，先到 Redis 中读取
- 发生缓存缺失时，需要到数据库读取数据
- 发生缓存缺失时，还需要把数据写入缓存中
根据 Redis 缓存是否接受写请求，可以把它分成只读缓存和读写缓存

#### 只读缓存（旁路缓存）

应用要读取数据的话，先在 Redis 中寻找数据是否存在。如果发生了缓存缺失，就从数据库中读出来并且写到数据库中。
所有的数据写请求，直接在数据库中增删改。对于删改的数据来说，如果 Redis 已经缓存了相应的数据，需要将这些缓存删除。

#### 读写缓存

服务端把 cache 当作主要的数据存储，从中读取数据并将数据写入。
除了读请求会发送到缓存进行处理，所有的写请求也会发送到缓存，在缓存中直接对数据进行增删改操作。
这种方式能够快速返回给业务应用，提升响应速度。但是如果 Redis 发生了掉电，数据可能会丢失，给业务带来风险。
针对业务对数据可靠性和缓存性能的要求，有同步直写和异步写回两种方案。

**同步直写**

适合写多的场景，通常需要结合分布式锁

优先考虑了数据的可靠性。写请求在发给缓存的同时，也会发给数据库进行处理，等到缓存和数据库都完成后才会返回给客户端。
将数据写回 DB 是同步的，能够保证数据的强一致，但是会阻塞 Redis，降低访问性能

**异步写回** 

优先考虑了响应延迟，将所有写请求都先在缓存中处理。等到 cache 写满时，才异步地将数据同步到 DB，cache 和 DB 的数据会出现短暂的不一致。
这种模式写性能非常高，适合数据经常变化但一致性要求不高的场景，如统计点赞量，浏览量。