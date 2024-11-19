//  this is a idea for using unit test

import { sum } from '../utils.js';

describe ( 'Unit test - test sum method' , () => {
    it('Test util.sum method' , () => {
        const a = sum(1,1)
        expect(a).toBe(2)
    });    
});         