#include "Database.h"
#include <fstream>
#include <iostream>

Database::Database(const std::string& fileName) : fileName(fileName) {
    loadData();
}

void Database::loadData() {
    std::ifstream file(fileName);
    if (file.is_open()) {
        file >> data;
        file.close();
    }
}

void Database::saveData() const {
    std::ofstream file(fileName);
    if (file.is_open()) {
        file << data.dump(4);
        file.close();
    }
}

void Database::addData(const nlohmann::json& newData) {
    data.push_back(newData);
    saveData();
}

void Database::updateData(int id, const nlohmann::json& newData) {
    if (data >= 0 && id < data.size()) {
        data[id] = newData;
        saveData();
    }
}

void Database::deleteData(int id) {
    if (id >= 0 && id < data.size()) {
        data.erase(data.begin() + id);
        saveData();
    }
}

nlohmann::json Database::getData() const {
    return data;
}
