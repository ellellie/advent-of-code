const input = '459672813'.split('').map(c => +c)

class Node {
    constructor(data, next) {
        this.data = data
        this.next = next
    }
}

let arr = []
for(let i = 0; i <= 1000000; i++)
    arr[i] = new Node(i)

for(let i = 1; i < 1000000; i++)
    arr[i].next = arr[i + 1]

arr[1000000].next = arr[input[0]]

for(let i = 0; i < input.length - 1; i++)
    arr[input[i]].next = arr[input[i+1]]

arr[input[input.length - 1]].next = arr[10]

let curr = arr[input[0]]
for(let i = 0; i < 10000000; i++) {
    const head = curr.next
    curr.next = head.next.next.next
    let dest = curr.data - 1
    if(dest <= 0) dest = 1000000
    while(arr[dest] === head || arr[dest] === head.next || arr[dest] === head.next.next) {
        dest--
        if(dest <= 0) dest = 1000000
    }

    head.next.next.next = arr[dest].next
    arr[dest].next = head

    curr = curr.next
}

console.log('p2', arr[1].next.data * arr[1].next.next.data)
