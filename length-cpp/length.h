#ifndef LENGTH
#ifdef __cplusplus
#define LENGTH
#include <stack>
#include <vector>
#include <iterator>
#include <iostream>
#include <algorithm>
#include <functional>
using namespace std;

void length_backup_printf(string x) {
    printf(x.c_str());
}

void length_backup_throw_error(string x) {
    printf("Error: %s\n", x.c_str());
}

string length_backup_input() {
    string x;
    cin >> x;
    return x;
}

string length_vector_join(vector<int> x, string separator = " ") {
    string y = "";
    int length_constant = static_cast<int>(x.size()) - 1;
    for (int z = 0; z < x.size(); z++) {
        y.append(to_string(x[z]));
        if (z == length_constant) {}
        else y.append(separator);
    }
    return y;
}

string length_underflow_error() {
    return "Stack underflow at line ";
}

string length_eof_error() {
    return "EOF at line ";
}

void length_run(vector<int> program, bool debug = false, function<void(string)> length_printf = length_backup_printf, function<string(void)> length_input = length_backup_input, function<void(string)> length_throw_error = length_backup_throw_error) {
    stack<int> stack;
    vector<int> temp;
    for (int x = 0; x < program.size(); x++) {
        switch (program[x]) {
            case 9:
            {
                length_printf("Input:\n");
                length_printf("");
                string input = length_input();
                int y = (int)input.at(0);
                stack.push(y);
                break;
            }
            case 10:
            {
                if (debug) length_printf("add\n");
                if (stack.size() < 2) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                int z = stack.top();
                stack.pop();
                stack.push(y + z);
                break;
            }
            case 11:
            {
                if (debug) length_printf("sub\n");
                if (stack.size() < 2) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                int z = stack.top();
                stack.pop();
                stack.push(z - y);
                break;
            }
            case 12:
            {
                if (debug) length_printf("dup\n");
                stack.push(stack.top());
                break;
            }
            case 13:
            {
                if (debug) length_printf("cond\n");
                if (stack.size() < 1) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                if (y == 0) {
                    x++;
                    if (program.size() <= x) return length_throw_error(length_eof_error() + to_string(x));
                    if (program[x] == 14 || program[x] == 25) x++;
                }
                break;
            }
            case 14:
            {
                if (debug) length_printf("gotou\n");
                int y =  x + 1;
                if (program.size() <= y) return length_throw_error(length_eof_error() + to_string(y));
                x = program[y] - 1;
                if (debug) length_printf("pc = " + to_string(x) + "\n");
                break;
            }
            case 15:
            {
                if (debug) length_printf("outn::::::::::\n");
                if (stack.size() < 1) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                length_printf(to_string(y));
                break;
            }
            case 16:
            {
                if (debug) length_printf("outa::::::::::\n");
                if (stack.size() < 1) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                char z = y;
                length_printf(string(1, z));
                break;
            }
            case 20:
            {
                if (debug) length_printf("mul\n");
                if (stack.size() < 2) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                int z = stack.top();
                stack.pop();
                stack.push(y * z);
                break;
            }
            case 21:
            {
                if (debug) length_printf("div\n");
                if (stack.size() < 2) return length_throw_error(length_underflow_error() + to_string(x + 1));
                int y = stack.top();
                stack.pop();
                int z = stack.top();
                stack.pop();
                stack.push(z / y);
                break;
            }
            case 24:
            {
                if (debug) length_printf("gotos\n");
                if (stack.size() < 1) return length_throw_error(length_underflow_error() + to_string(x + 1));
                x = stack.top();
                stack.pop();
                if (debug) length_printf("pc = " + to_string(x) + "\n");
                break;
            }
            case 25:
            {
                if (debug) length_printf("push\n");
                int y = x + 1;
                if (program.size() <= y) return length_throw_error(length_eof_error() + to_string(y));
                stack.push(program[y]);
                x++;
                break;
            }
        }

        if (debug) {
            temp.clear();
            while (!stack.empty()) {
                temp.insert(temp.begin(), stack.top());
                stack.pop();
            }
            printf("%s\n", length_vector_join(temp, ", ").c_str());
            while (!temp.empty()) {
                stack.push(temp[0]);
                temp.erase(temp.begin());
            }
        }
    }
    length_printf("\n");
}
#endif
#endif