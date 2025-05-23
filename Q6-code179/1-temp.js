/** 
LCR 170. 交易逆序对的总数

在股票交易中，如果前一天的股价高于后一天的股价，则可以认为存在一个「交易逆序对」。
请设计一个程序，输入一段时间内的股票交易记录 record，返回其中存在的「交易逆序对」总数。


示例 1：
输入：record = [9, 7, 5, 4, 6]
输出：8
解释：交易中的逆序对为 (9, 7), (9, 5), (9, 4), (9, 6), (7, 5), (7, 4), (7, 6), (5, 4)。
*/

S1 假设存在一个最优序列不满足该排序规则，
即 至少存在一对相邻字符串s1,s2， 满足 s2 + s1 < s1 + s2，且在此时 s1 优先于s2 被选取

S2 由于交换s1,s2 不会改变其他字符串对最终值的贡献（这是因为s1,s2 相邻），
因此根据我们定义的比较逻辑，交换s1,s2 后字符串的值严格增加，这与序列的最优性矛盾

S3 由此得证最优序列满足该排序规则