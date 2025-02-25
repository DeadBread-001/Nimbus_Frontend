const config = {
  endOfLine: "crlf",
  overrides: [
    {
      files: "**/*.hbs",
      options: {
        parser: "angular",
      },
    },
  ],
};

module.exports = config;
