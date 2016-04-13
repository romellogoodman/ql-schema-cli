#!/usr/bin/env babel-node
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

commander
  .arguments('<file>')
  .option('-E, --Entry <entry>', 'Entry point into the schema. Dependent on whether Schema was expoerted as deault or something else.')
  .option('-P, --Print', 'Print the schema instead of outputting to a file')
  .parse(process.argv);

const fileLocation = commander.args[0]
const schmeaLocation = path.join(process.cwd(), fileLocation);
let schema = require(schmeaLocation);

schema = commander.Entry ? schema[commander.Entry] : schema.default;

if (commander.Print) {
  (async () => {
    console.log(`Readable Schema for: ${schmeaLocation}\n`);
    var result = await printSchema(schema);

    console.log(result);
  })();
} else {
  (async () => {
    var result = await graphql(schema, introspectionQuery);

    if (result.errors) {
      console.error('ERROR Introspecting Schema');
      console.error(
        JSON.stringify(result, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(process.cwd(), 'schema.json'),
        JSON.stringify(result, null, 2)
      );
      console.log('SUCCESS!!!');
      console.log(`Wrote the Schema to: ${path.join(process.cwd(), 'schema.json')}`);
    }
  })();
}
