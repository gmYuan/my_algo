/**

题目链接：
https://leetcode.cn/problems/implement-stack-using-queues/description/

*/





// 方法3
/// Source : https://leetcode.com/problems/implement-stack-using-queues/description/
/// Author : liuyubobobo
/// Time   : 2018-09-29

#include <iostream>
#include <queue>
#include <cassert>

using namespace std;


/// Naive Implementation
/// Using a variable to record top element:)
///
/// Time Complexity: init: O(1)
///                  push: O(n)
///                  pop: O(1)
///                  top: O(1)
///                  empty: O(1)
/// Space Complexity: O(n)
class MyStack3 {

private:
    queue<int> q;

public:
    /** Initialize your data structure here. */
    MyStack() {}

    /** Push element x onto stack. */
    void push(int x) {

        queue<int> q2;
        while(!q.empty()){
            q2.push(q.front());
            q.pop();
        }

        q.push(x);

        while(!q2.empty()){
            q.push(q2.front());
            q2.pop();
        }
    }

    /** Removes the element on top of the stack and returns that element. */
    int pop() {

        assert(!empty());
        int ret = q.front();
        q.pop();
        return ret;
    }

    /** Get the top element. */
    int top() {
        assert(!empty());
        return q.front();
    }

    /** Returns whether the stack is empty. */
    bool empty() {
        return q.empty();
    }
};


int main() {

    return 0;
}

// 方法4
/// Source : https://leetcode.com/problems/implement-stack-using-queues/description/
/// Author : liuyubobobo
/// Time   : 2018-09-29

#include <iostream>
#include <queue>
#include <cassert>

using namespace std;


/// Using only one queue!
///
/// Time Complexity: init: O(1)
///                  push: O(n)
///                  pop: O(1)
///                  top: O(1)
///                  empty: O(1)
/// Space Complexity: O(n)
class MyStack4 {

private:
    queue<int> q;
    int sz = 0;

public:
    /** Initialize your data structure here. */
    MyStack(): sz(0) {}

    /** Push element x onto stack. */
    void push(int x) {
        q.push(x);
        for(int i = 0; i < sz; i ++){
            int e = q.front();
            q.pop();
            q.push(e);
        }
        sz ++;
    }

    /** Removes the element on top of the stack and returns that element. */
    int pop() {

        assert(!empty());
        int ret = q.front();
        q.pop();
        sz --;
        return ret;
    }

    /** Get the top element. */
    int top() {
        assert(!empty());
        return q.front();
    }

    /** Returns whether the stack is empty. */
    bool empty() {
        return q.empty();
    }
};


int main() {

    return 0;
}