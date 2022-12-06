let w = 0,
    x = 0,
    y = 0,
    z = 0

y = input[0] + 1
z = y

// x = z % 26 + 11 // Always >= 10
x = 1
y = input[1] + 9
z *= 26
z += y

x = 1
y = 0
z *= 26
z += input[2] + 12

x = 1
z *= 26
y = input[3] + 6
z += input[3] + 6

w = input[4]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -6
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 9
y *= x
z += y

w = input[5]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -14
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 15
y *= x
z += y

w = input[6]
x *= 0
x += z
x %= 26
z = Math.floor(z / 1)
x += 14
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 7
y *= x
z += y

w = input[7]
x *= 0
x += z
x %= 26
z = Math.floor(z / 1)
x += 13
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 12
y *= x
z += y

w = input[8]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -8
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 15
y *= x
z += y

w = input[9]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -15
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 3
y *= x
z += y

w = input[10]
x *= 0
x += z
x %= 26
z = Math.floor(z / 1)
x += 10
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 6
y *= x
z += y

w = input[11]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -11
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 2
y *= x
z += y

w = input[12]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -13
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 10
y *= x
z += y

w = input[13]
x *= 0
x += z
x %= 26
z = Math.floor(z / 26)
x += -4
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
y *= 0
y += 25
y *= x
y += 1
z *= y
y *= 0
y += w
y += 12
y *= x
z += y
