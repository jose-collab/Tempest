
const Database = require("better-sqlite3");
const util = require("util");
let db;

if (!db) db = new Database("./json.sqlite");


var methods = {
    fetch: require("./methods/fetch.js"),
    set: require("./methods/set.js"),
    add: require("./methods/add.js"),
    subtract: require("./methods/subtract.js"),
    push: require("./methods/push.js"),
    delete: require("./methods/delete.js"),
    has: require("./methods/has.js"),
    all: require("./methods/all.js"),
    type: require("./methods/type"),
};

module.exports = {

    version: require("../package.json").version,




    fetch: function (key, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        return arbitrate("fetch", { id: key, ops: ops || {} });
    },
    get: function (key, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        return arbitrate("fetch", { id: key, ops: ops || {} });
    },



    set: function (key, value, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        if (value === undefined)
            throw new TypeError(
                "Nenhum valo especificado."
            );
        return arbitrate("set", {
            stringify: true,
            id: key,
            data: value,
            ops: ops || {},
        });
    },



    add: function (key, value, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        if (isNaN(value))
            throw new TypeError(
                "Deve especificar o valor a ser adicionado."
            );
        return arbitrate("add", { id: key, data: value, ops: ops || {} });
    },



    subtract: function (key, value, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        if (isNaN(value))
            throw new TypeError(
                "Deve especificar o valor a ser adicionado."
            );
        return arbitrate("subtract", { id: key, data: value, ops: ops || {} });
    },



    push: function (key, value, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        if (!value && value != 0)
            throw new TypeError(
                "Deve especificar o valor a ser adicionado."
            );
        return arbitrate("push", {
            stringify: true,
            id: key,
            data: value,
            ops: ops || {},
        });
    },




    delete: function (key, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        return arbitrate("delete", { id: key, ops: ops || {} });
    },



    has: function (key, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        return arbitrate("has", { id: key, ops: ops || {} });
    },

    includes: function (key, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        return arbitrate("has", { id: key, ops: ops || {} });
    },



    all: function (ops) {
        return arbitrate("all", { ops: ops || {} });
    },

    fetchAll: function (ops) {
        return arbitrate("all", { ops: ops || {} });
    },



    type: function (key, ops) {
        if (!key)
            throw new TypeError(
                "Nenhuma chave especificada."
            );
        return arbitrate("type", { id: key, ops: ops || {} });
    },



    table: function (tableName, options = {}) {
        // Set Name
        if (typeof tableName !== "string")
            throw new TypeError(
                "O nome da tabela deve ser uma string"
            );
        else if (tableName.includes(" "))
            throw new TypeError(
                "O nome da tabela não pode incluir espaços."
            );
        this.tableName = tableName;

        // Methods
        this.fetch = function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            return arbitrate(
                "fetch",
                { id: key, ops: ops || {} },
                this.tableName
            );
        };

        this.get = function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            return arbitrate(
                "fetch",
                { id: key, ops: ops || {} },
                this.tableName
            );
        };

        this.set = function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            if (!value && value != 0)
                throw new TypeError(
                    "Nenhum valo especificado"
                );
            return arbitrate(
                "set",
                { stringify: true, id: key, data: value, ops: ops || {} },
                this.tableName
            );
        };

        this.add = function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            if (isNaN(value))
                throw new TypeError(
                    "Deve especificar o valor a ser adicionado."
                );
            return arbitrate(
                "add",
                { id: key, data: value, ops: ops || {} },
                this.tableName
            );
        };

        this.subtract = function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            if (isNaN(value))
                throw new TypeError(
                    "Deve especificar o valor a ser adicionado."
                );
            return arbitrate(
                "subtract",
                { id: key, data: value, ops: ops || {} },
                this.tableName
            );
        };

        this.push = function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            if (!value && value != 0)
                throw new TypeError(
                    "Deve especificar o valor para push."
                );
            return arbitrate(
                "push",
                { stringify: true, id: key, data: value, ops: ops || {} },
                this.tableName
            );
        };

        this.delete = function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            return arbitrate(
                "delete",
                { id: key, ops: ops || {} },
                this.tableName
            );
        };

        this.has = function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            return arbitrate(
                "has",
                { id: key, ops: ops || {} },
                this.tableName
            );
        };

        this.includes = function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Nenhuma chave especificada"
                );
            return arbitrate(
                "has",
                { id: key, ops: ops || {} },
                this.tableName
            );
        };

        this.fetchAll = function (ops) {
            return arbitrate("all", { ops: ops || {} }, this.tableName);
        };

        this.all = function (ops) {
            return arbitrate("all", { ops: ops || {} }, this.tableName);
        };
    },
};

function arbitrate(method, params, tableName) {
    // Configure Options
    let options = {
        table: tableName || params.ops.table || "json",
    };

    // Access Database
    db.prepare(
        `CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`
    ).run();

    // Verify Options
    if (params.ops.target && params.ops.target[0] === ".")
        params.ops.target = params.ops.target.slice(1); // Remove prefix if necessary
    if (params.data && params.data === Infinity)
        throw new TypeError(
            `You cannot set Infinity into the database @ ID: ${params.id}`
        );

    // Stringify
    if (params.stringify) {
        try {
            params.data = JSON.stringify(params.data);
        } catch (e) {
            throw new TypeError(
                `Forneça uma entrada válida @ ID: ${params.id}\nError: ${e.message}`
            );
        }
    }

    // Translate dot notation from keys
    if (params.id && params.id.includes(".")) {
        let unparsed = params.id.split(".");
        params.id = unparsed.shift();
        params.ops.target = unparsed.join(".");
    }

    // Run & Return Method
    return methods[method](db, params, options);
}
