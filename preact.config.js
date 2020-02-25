const preactCliPostCSS = require("preact-cli-postcss")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob")

// Custom PurgeCSS extractor for special characters in Tailwind's classnames
class TailwindExtractor {
    static extract(content) {
        return content.match(/[\w-/:]+(?<!:)/g) || []
    }
}

// PurgeCSS webpack plugin
const purgeCssPlugin = new PurgecssPlugin({
    paths: glob.sync("./src/**/*.ts"),
    extractors: [
        {
            extractor: TailwindExtractor,
            extensions: ["tsx", "css"]
        }
    ]
})

export default function(config, env, helpers) {
    // Use postcss.config.js instead of default postCSS config
    preactCliPostCSS(config, helpers)

    config.resolve.alias["react"] = "preact/compat"
    config.resolve.alias["react-dom"] = "preact/compat"
    config.resolve.alias["preact-compat"] = "preact/compat"

    config.module.rules.push({
        test: /\.tsx?$/,
        loader: require.resolve("ts-loader")
    })

    // Run styles through purgeCSS for production only
    if (env.production) {
        // PurgeCSS still overriding everything.
        //config.plugins.push(purgeCssPlugin)
    }

    return config
}
