#!/usr/bin/env node

import bool_test from "./bool_test.mjs"
// tests for H5T_COMPOUND and H5T_ARRAY support
import compound_and_array_tests from "./compound_and_array_test.mjs";
import datatype_test from "./datatype_test.mjs";
import create_dataset from './create_group_dataset.mjs';
import read_to_array from './to_array_test.mjs';
import filters_test from './filters_test.mjs';
import test_links from './create_read_links.mjs';
import test_attributes from './create_delete_attributes.mjs';
import test_overwrite_dataset from './overwrite_dataset.mjs';
import create_chunked from './chunks_resize.mjs';
import bigendian_read from './bigendian_read.mjs';

let tests = [];
const add_tests = (tests_in) => { /*global*/ tests = tests.concat(tests_in)}

add_tests(bool_test);
add_tests(compound_and_array_tests);
add_tests(create_dataset);
add_tests(read_to_array);
add_tests(datatype_test);
add_tests(filters_test);
add_tests(test_links);
add_tests(test_attributes);
add_tests(test_overwrite_dataset);
add_tests(create_chunked);
add_tests(bigendian_read);

async function run_test(test) {
    try {
        await test.test();
        console.log('✓', test.description);
    }
    catch (error) {
        console.log('x', test.description);
        console.log(error.stack);
    }
}

async function run_tests(tests) {
    for (let test of tests) {
        await run_test(test);
    }
}

await run_tests(tests);
