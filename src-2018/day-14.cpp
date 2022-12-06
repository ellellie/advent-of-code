#include <iostream>

struct node {
    int score;

    node *next;
    node *prev;
};

void forward(node *curr) {
    do {
        std::cout << curr->score << "\n";
        curr = curr->next;
    } while( curr != 0 );
}

void backward(node *curr) {
    do {
        std::cout << curr->score << "\n";
        curr = curr->prev;
    } while( curr != 0 );
}

void tailNode(int score[], node *curr, int i) {
    for(int j=0; j < i; j++) {
        score[j] = curr->score;
        curr = curr->prev;
    }
}

int main() {
    node *head;
    node *tail;

    head = new node;
    tail = new node;

    head->next = tail;
    head->prev = 0;
    head->score = 3;

    tail->next = 0;
    tail->prev = head;
    tail->score = 7;

    int scores[2];
    tailNode(scores, tail, 2);

    std::cout << scores[1];

    std::cout << "test\n";
}