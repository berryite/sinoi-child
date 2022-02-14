module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        dependencies: {
            axios: "^0.21.1",
            "core-js": "^3.6.5",
            "element-plus": "^2.0.1",
            "js-base64": "^3.6.1",
            vue: "^3.0.0",
            "vue-router": "^4.0.0-0",
            vuex: "^4.0.0-0",
        },
        devDependencies: {
            "@vue/cli-plugin-babel": "~4.5.0",
            "@vue/cli-plugin-eslint": "~4.5.0",
            "@vue/cli-plugin-router": "~4.5.0",
            "@vue/cli-plugin-vuex": "~4.5.0",
            "@vue/cli-service": "~4.5.0",
            "@vue/compiler-sfc": "^3.0.0",
            "@vue/eslint-config-prettier": "^6.0.0",
            "babel-eslint": "^10.1.0",
            eslint: "^6.7.2",
            "eslint-plugin-prettier": "^3.3.1",
            "eslint-plugin-vue": "^7.0.0",
            prettier: "^2.2.1",
            sass: "^1.26.5",
            "sass-loader": "^8.0.2",
            "ts-loader": "8.0.14",
            typescript: "^4.4.3",
            "vue-loader-v16": "^16.0.0-beta.5.4",
        },
        scripts: {
            serve: "vue-cli-service serve",
            build: "vue-cli-service build",
            "build:prod": "vue-cli-service build",
            "build:test": "vue-cli-service build --mode test",
            "build:pre": "vue-cli-service build --mode pre",
            lint: "vue-cli-service lint",
            api: "node interface-generator-ts/index.js",
        },
    });

    // 插件判断添加
    // if (options.vant) {
    //     api.extendPackage({
    //         dependencies: {
    //             vant: "^2.10.4",
    //         },
    //         devDependencies: {
    //             "babel-plugin-import": "^1.13.0",
    //         },
    //     });
    // }

    api.render({
        "./.env": "./template/.env",
        "./.env.test": "./template/.env.test",
        "./.env.pre": "./template/.env.pre",
        "./.env.production": "./template/.env.production",
        "./.gitignore": "./template/.gitignore",
        "./.eslintrc.js": "./template/.eslintrc.js",
        "./.eslintignore": "./template/.eslintignore",
        "./.prettierrc": "./template/.prettierrc",
        "./src/main.js": "./template/src/main.js",
    });

    api.render("./template");

    api.postProcessFiles((files) => {
        let template = files["public/index.html"];
        if (template) {
            const lines = template.split(/\r?\n/g).reverse();
            const lastMetaIndex = lines.findIndex((line) =>
                line.trim().match(/^<meta/)
            );
            
            lines[lastMetaIndex] +=
                '\n    <link rel="icon" href="<%= BASE_URL %>favicon.ico">';
            lines[lastMetaIndex] +=
                '\n    <link rel="icon" href="https://at.alicdn.com/t/font_3181199_u4qjypmz20f.css">';
            lines[lastMetaIndex] +=
                "\n    <title><%= htmlWebpackPlugin.options.title %></title>";

            const lastBodyIndex = lines.findIndex((line) =>
                line.trim().match(/^<body/)
            );
            lines[lastBodyIndex] += `\n
                <noscript>
                    <strong>
                        We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
                        Please enable it to continue.
                    </strong>
                </noscript>`;

            files["public/index.html"] = lines.reverse().join("\n");
        }
    });
};
