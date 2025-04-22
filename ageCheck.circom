pragma circom 2.0.0;

include "circomlib/circuits/comparators.circom";

template IsOver18() {
    signal input age;
    signal output isOver18;

    component cmp = GreaterThan(8); // 8-bit untuk batas aman umur (0-255)
    cmp.in[0] <== age;
    cmp.in[1] <== 18;

    isOver18 <== cmp.out;
}

component main = IsOver18();
