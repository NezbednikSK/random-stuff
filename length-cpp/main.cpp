#include <string>
#include <vector>
#include <fstream>

#include "length.h"

int main(int argc, char **argv) {
    bool verbose = false;
    string filename;
    for (int x = 1; x < argc; x++) {
        string arg(argv[x]);
        if (arg == "--verbose") verbose = true;
        else filename = arg;
    }
    std::ifstream file(filename);
    if (!file.good()) {
        printf("Error: File does not exist!\n");
        exit(1);
    }
    std::string line;
    std::vector<int> program;
    while (getline(file, line)) {
        program.push_back(line.length());
    }
    length_run(program, verbose);
    file.close();
    return 0;
}
