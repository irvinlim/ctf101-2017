# CTF101 2017: Challenge 3

## Type of challenge

- Stack buffer overflow
- Overwrite return address
- Determining offsets

## Flag

```
ctf{conquered_the_impossible}
```

---

## Exploit

1. Install GDB Enhanced Features (`gef`).
2. Create [de Bruijn sequence](https://www.wikiwand.com/en/De_Bruijn_sequence) of length 100 in `gef` with `pattern create 100`.
3. Inject it as payload to input and get the return address that caused the *Segmentation Fault*.
4. Search for offset using `pattern search 0x61616161`.
