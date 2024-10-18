#ifndef DATABASE_H
#define DATABASE_H

#include <string>
#include <vector>
#include <nlohmann/json.hpp>

class Database {
    public:
        Database(const std::string& fileName);
        void addData(const nlohmann::json& newData);
        void updateData(int id, const nlohmann::json& newData);
        void deleteData(int id);
        nlohmann::json getData() const;

    private:
        std::string fileName;
        nlohmann::json data;
        void loadData();
        void saveData() const;
};

#endif