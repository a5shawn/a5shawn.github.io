# MySQL 必知必会

## 书写顺序

<code style="color:red">**SELECT**</code> -> `FROM` -> `JOIN` -> `ON` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `ORDER BY` -> `LIMIT`

## 执行顺序

`FROM` -> `JOIN` -> `ON` -> `WHERE` -> `GROUP BY` -> `HAVING` -> <code style="color:red">**SELECT**</code> -> `ORDER BY` -> `LIMIT`

::: warning 注意
实际的执行顺序是由数据库的查询优化器决定的，它可能会调整顺序以提高查询性能。
:::

## 检索数据

### DISTINCT

指示 MySQL 只返回不同的值

```sql
SELECT DISTINCT column_name FROM table_name;
```

::: warning 注意
DISTINCT 关键字必须直接放在列名的前面

DISTINCT 关键字应用于所有列而不仅是前置它的列
:::

### LIMIT

限制返回的结果数量

```sql
SELECT column_name FROM table_name LIMIT n1[, n2];
```

`n1` 表示开始位置，从 0 开始；`n2` 表示要检索的行数。

::: warning 注意
如果 LIMIT 后面只指定一个参数，则表示返回的行数。
:::

::: tip 提示
MySQL 5 支持 OFFSET 子句，代替 LIMIT 子句。

OFFSET 子句可以用来跳过指定数量的行，然后返回剩余的行。

LIMIT 4 OFFSET 3 表示从第 4 行开始，返回 4 行，等同于 LIMIT 3, 4。
:::

### ORDER BY

按照指定列**依次**排序。

```sql
SELECT column_name FROM table_name ORDER BY column_name1 [ASC|DESC], column_name2 [ASC|DESC], ...;
```

::: warning 注意
DESC|ASC 关键字只能应用到直接位于其前面的列名

如果想在多个列上进行排序，必须对每个列指定 DESC|ASC 关键字
:::

## 过滤数据

### LIKE

指示 MySQL 后跟的搜索模式利用通配符匹配而不是直接相等匹配进行比较。

```sql
SELECT column_name FROM table_name WHERE column_name LIKE pattern;
```

**pattern**

- `%` 匹配任何字符出现任意次数

  ```sql
  WHERE column_name LIKE 'abc%';
  ```

  匹配以 `abc` 开头的字符串

  ```sql
  WHERE column_name LIKE '%abc';
  ```

  匹配以 `abc` 结尾的字符串

  ```sql
  WHERE column_name LIKE '%abc%';
  ```

  匹配包含 `abc` 的字符串

- `_` 匹配单个字符
  ```sql
  WHERE column_name LIKE 'abc_';
  ```
  匹配以 `abc_` 开头的字符串

::: tip 使用通配符的技巧

- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。

- 在确实需要使用通配符时，除非绝对有必要，否则不要把它们用在搜索模式的开始处。把通配符置于搜索模式的开始处，搜索起来是最慢的。

- 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。
  :::

### REGEXP

与 LIKE 类似，但使用正则表达式进行匹配。

```sql
SELECT column_name FROM table_name WHERE column_name REGEXP pattern;
```

## 处理函数

### 文本

<br>

#### LEFT

返回字符串左边的字符。

```sql
SELECT LEFT(column_name, n);
```

`n` 表示要返回的字符数。

#### RIGHT

返回字符串右边的字符。

```sql
SELECT RIGHT(column_name, n);
```

`n` 表示要返回的字符数。

#### LENGTH

返回字符串的长度。

```sql
SELECT LENGTH(column_name);
```

#### CONCAT

连接两个或多个字符串。

```sql
SELECT CONCAT(column_name1, column_name2,...);
```

#### SUBSTRING

返回子字符串。

```sql
SELECT SUBSTRING(column_name, start, length);
```

`start` 表示子字符串的起始位置，从 1 开始；`length` 表示子字符串的长度。

#### TRIM

删除字符串两端的空格。

```sql
SELECT TRIM(column_name);
```

#### UPPER

将字符串转换为大写。

```sql
SELECT UPPER(column_name);
```

#### LOWER

将字符串转换为小写。

```sql
SELECT LOWER(column_name);
```

#### REPLACE

替换字符串中的子字符串。

```sql
SELECT REPLACE(column_name, old_string, new_string);
```

#### REVERSE

反转字符串。

```sql
SELECT REVERSE(column_name);
```

### 日期

<br>

#### NOW

返回当前日期和时间。

```sql
SELECT NOW();
```

#### CURDATE

返回当前日期。

```sql
SELECT CURDATE();
```

#### CURTIME

返回当前时间。

```sql
SELECT CURTIME();
```

#### DATE

返回日期。

```sql
SELECT DATE(column_name);
```

#### TIME

返回时间。

```sql
SELECT TIME(column_name);
```

#### YEAR

返回年份。

```sql
SELECT YEAR(column_name);
```

#### MONTH

返回月份。

```sql
SELECT MONTH(column_name);
```

#### DAY

返回日期。

```sql
SELECT DAY(column_name);
```

#### DAYOFWEEK

返回星期几。

```sql
SELECT DAYOFWEEK(column_name);
```

#### DAYOFMONTH

返回月份中的日期。

```sql
SELECT DAYOFMONTH(column_name);
```

#### DAYOFYEAR

返回年份中的日期。

```sql
SELECT DAYOFYEAR(column_name);
```

#### HOUR

返回小时。

```sql
SELECT HOUR(column_name);
```

#### MINUTE

返回分钟。

```sql
SELECT MINUTE(column_name);
```

#### SECOND

返回秒。

```sql
SELECT SECOND(column_name);
```

#### DATE_FORMAT

格式化日期。

```sql
SELECT DATE_FORMAT(column_name, format);
```

`format` 表示日期格式。

#### DATE_ADD

日期加法。

```sql
SELECT DATE_ADD(column_name, INTERVAL value unit);
```

`value` 表示要加的数量；`unit` 表示要加的时间单位。

#### DATE_SUB

日期减法。

```sql
SELECT DATE_SUB(column_name, INTERVAL value unit);
```

`value` 表示要减的数量；`unit` 表示要减的时间单位。

#### DATEDIFF

计算两个日期之间的差值。

```sql
SELECT DATEDIFF(expr1, expr2);
```

#### ADDTIME

增加一个日期(天、周等)

```sql
SELECT ADDTIME(column_name, expr);
```

`expr` 是一个时间表达式，如 '0:10:20'，表示增加 0 时 10 分 20 秒。

#### ADDDATE

增加一个日期(月、年等)

```sql
SELECT ADDDATE(column_name, days);
SELECT ADDDATE(column_name, INTERVAL value unit);
```

<br>

**示例**

- 检索出 2005 年 9 月下的 所有订单

  ```sql
  SELECT * FROM orders WHERE YEAR(order_date) = 2005 AND MONTH(order_date) = 9;
  ```

### 数值

<br>

#### ABS

返回绝对值。

```sql
SELECT ABS(column_name);
```

#### CEIL

向上取整。

```sql
SELECT CEIL(column_name);
```

#### FLOOR

向下取整。

```sql
SELECT FLOOR(column_name);
```

#### ROUND

四舍五入。

```sql
SELECT ROUND(column_name);
```

#### TRUNCATE

截断小数。

```sql
SELECT TRUNCATE(column_name, decimals);
```

`decimals` 表示要保留的小数位数。

#### RAND

返回一个随机数。

```sql
SELECT RAND();
```

#### POWER

返回一个数的乘方。

```sql
SELECT POWER(column_name1, column_name2);
```

#### SQRT

返回一个数的平方根。

```sql
SELECT SQRT(column_name);
```

#### PI

返回圆周率。

```sql
SELECT PI();
```

#### COS

返回一个数的余弦值。

```sql
SELECT COS(column_name);
```

#### SIN

返回一个数的正弦值。

```sql
SELECT SIN(column_name);
```

#### TAN

返回一个数的正切值。

```sql
SELECT TAN(column_name);
```

### 聚集

<br>

#### MAX

返回指定列的最大值。

```sql
SELECT MAX(column_name);
```

#### MIN

返回指定列的最小值。

```sql
SELECT MIN(column_name);
```

#### AVG

返回指定列的平均值。

```sql
SELECT AVG(column_name);
```

#### SUM

返回指定列的总和。

```sql
SELECT SUM(column_name);
```

#### COUNT

返回指定列的行数。

```sql
SELECT COUNT(column_name);
```

::: warning 注意

- COUNT(\*) 对表中行的数目进行计数，不管表列中包含的是空值(NULL)还是非空值。
- COUNT(column_name) 对特定列中具有值的行进行计数，忽略 NULL 值。
  :::

## 分组数据

### GROUP BY

按照指定列进行分组。

```sql
SELECT column_name FROM table_name GROUP BY column_name;
```

::: warning 注意

- GROUP BY 子句可以包含任意数目的列。
- GROUP BY 子句中列出的每个列都必须是检索列或有效的表达式(但不能是聚集函数)。
- <span style="color:red">除聚集计算语句外，SELECT 语句中的每个列都必须在 GROUP BY 子句中给出。</span>
  :::

::: tip 提示
使用 WITH ROLLUP 关键字，可以得到每个分组以及每个分组汇总级别(针对每个分组)的值。

```sql
SELECT column_name FROM table_name GROUP BY column_name WITH ROLLUP;
```

:::

### HAVING

与 WHERE 子句类似，用于对分组进行过滤。事实上，目前为止所学过的所有类型的 WHERE 子句都可以用 HAVING 来替代。

**唯一的区别是 WHERE 过滤行，而 HAVING 过滤分组。**

:::tip 提示
这里有另一种理解方法，WHERE 在数据分组前进行过滤，HAVING 在数据分组后进行过滤。
:::

```sql
SELECT column_name FROM table_name GROUP BY column_name HAVING condition;
```

::: warning 注意

- HAVING 子句必须出现在 GROUP BY 子句之后。
- HAVING 子句中只能包含聚集函数或聚合函数的别名。
- <span style="color:red">HAVING 子句的执行顺序是在 GROUP BY 和聚合函数执行之后，但在 SELECT 子句选择具体列之前。</span>（这里就解释了为什么 HAVING 子句能使用聚集函数别名）

:::
