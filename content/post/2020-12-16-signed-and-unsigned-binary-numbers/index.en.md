---
title: Signed and Unsigned Binary Numbers
author: Thiago de Paula Oliveira
date: '2020-12-16'
slug: signed-and-unsigned-binary-numbers
categories:
  - C++
  - Computer Programs
tags:
  - C++
  - Computer Science
  - Computer Programs
subtitle: ''
summary: ''
authors: 
- admin
lastmod: '2020-12-16T12:10:51Z'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
output:
  html_document:
    keep_md: yes
    toc: true
    css: "my_style.css"
---

# Introduction

When we think about writing a program in C, the first step is understand how variables should be assigned. There are several variable's type in C, and here we are introducing the type `int`, which is used for integer data types. Basically, we can define a variable as an integer in two ways:
<div class="div-1">
* Uninitialized variable: defined as `int x;`, where no value is assign to the variable $x$ (Figure 1), which generally is not a good idea as it could lead to a bug in the algorithm if no value is assign over the code. 
* Initialized variable: there are two ways to assign a value to a variable $x$ (Figure 1):
  <div class = "div-2">
    * in a single declaration -  `int x = 3;`
    * in a double step declaration - `int x;` and `x = 3;`
  </div>
</div>

<div class="figure" style="text-align: center">
<img src="var_and_exp.png" alt="Declaring variables in C" width="550px" />
<p class="caption">Declaring variables in C</p>
</div>

Additionally, there are a large set of storage size-specific declarations for a integer, and here we will explain just an initial idea about it. Figure 2 showns the Integer representation of whole numbers or fixed-point numbers (fixed number of digits). Generally, computers use a fixed number of bits to represent them, where commonly used bit-lengths for integers are 8-bit, 16-bit (`short`), 32-bit (`long`) or 64-bit (`long long`). There are two representation schemes for integers called signed integer type (`signed int`) capable of containing the range of values from -32,767 to 32,767, and unsigned integer type (`unsigned int`) containing the range of values from 0 to 65,535 ($32767 \times 2+1$). Therefore, `unsigned` qualifier should be used when we are working with only positive values. 

<div class="figure" style="text-align: center">
<img src="binary_number.png" alt="Integer Representation" width="500px" />
<p class="caption">Integer Representation</p>
</div>

Furthermore, there are three representation schemes for signed integers called *Sign-Magnitude representation*, *1's Complement representation*, and *2's Complement representation*. The 1’s and the 2’s complements of a binary number are important because they permit different representation for negative numbers. In all of these schemes, positive signed binary numbers starts with value 0 while negative ones starts with value 1 (Figure 3).

<div class="figure" style="text-align: center">
<img src="sign_bit.png" alt="Signed binary numbers" width="300px" />
<p class="caption">Signed binary numbers</p>
</div>
Consequently, the disadvantage of signed binary numbers is that there is 1 bit used to store the sign positive or negative while the remaning $n-1$ bits are assign to the range of digits from $-2^{n-1}$ to $2^{n-1}$. If we have 8 bits to represent a signed binary number, we have to use 1 bit for the **sign bit** and 7 bits for the **magnitude bits**:

<div class="div-1">
* Using Sign-Magnitude Representation:
$$-|2^{\left(8-1\right)}-1| \mbox{ to } 2^{\left(8-1\right)}-1 = -127 \mbox{ to } 127$$
* Using 2's Complement Representation:
$$-2^{\left(8-1\right)} \mbox{ to } 2^{\left(8-1\right)}-1 = -128 \mbox{ to } 127$$
</div>
Thus, we can representing the numbers ranging from -128 to 127 using 2's Complement Representation. Probably now you are asking why there is one extra number being accounted when using 2's Complement Representation. The answer can be found in the Figure 4.

<div class="figure" style="text-align: center">
<img src="repre_scheme.png" alt="Representation schemes of Sign-Magnitude Representation and 2's Complement Representation" width="400px" />
<p class="caption">Representation schemes of Sign-Magnitude Representation and 2's Complement Representation</p>
</div>

# Examples

## Unsigned int
Supose we are interested in representing a sequence of number $x$ where $x \in \lbrace 0, 1, \ldots, 15\rbrace$. We can assign these numbers as unsigned numbers of 4 bits. Consequently, we have **4 zero** bits associated to describe this numbers because our variable belongs to the interval $[0, 2^{4}−1] \in \mathcal{N}_{0}$. 

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>Representation of numbers from 0 to 15 in 4 bits</caption>
<tbody>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> bits </td>
   <td style="text-align:left;"> 0000 </td>
   <td style="text-align:left;"> 0001 </td>
   <td style="text-align:left;"> 0010 </td>
   <td style="text-align:left;"> 0011 </td>
   <td style="text-align:left;"> 0100 </td>
   <td style="text-align:left;"> 0101 </td>
   <td style="text-align:left;"> 0110 </td>
   <td style="text-align:left;"> 0111 </td>
   <td style="text-align:left;"> 1000 </td>
   <td style="text-align:left;"> 1001 </td>
   <td style="text-align:left;"> 1010 </td>
   <td style="text-align:left;"> 1011 </td>
   <td style="text-align:left;"> 1100 </td>
   <td style="text-align:left;"> 1101 </td>
   <td style="text-align:left;"> 1110 </td>
   <td style="text-align:left;"> 1111 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> x </td>
   <td style="text-align:left;"> 0 </td>
   <td style="text-align:left;"> 1 </td>
   <td style="text-align:left;"> 2 </td>
   <td style="text-align:left;"> 3 </td>
   <td style="text-align:left;"> 4 </td>
   <td style="text-align:left;"> 5 </td>
   <td style="text-align:left;"> 6 </td>
   <td style="text-align:left;"> 7 </td>
   <td style="text-align:left;"> 8 </td>
   <td style="text-align:left;"> 9 </td>
   <td style="text-align:left;"> 10 </td>
   <td style="text-align:left;"> 11 </td>
   <td style="text-align:left;"> 12 </td>
   <td style="text-align:left;"> 13 </td>
   <td style="text-align:left;"> 14 </td>
   <td style="text-align:left;"> 15 </td>
  </tr>
</tbody>
</table>

## Signed int

Supose now we are interested in representing a sequence of number $y$ where $y \in \lbrace -7, -6, \ldots,6, 7\rbrace$. We have to assign them as signed numbers using 4 bits because 1 bit will be used for **sign bit** and 3 bits for the **magnitude bits** to describe $y \in \left[-|2^3-1|,2^3-1\right] \in \mathcal{Z}$.

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>Sign-Magnitude Representation of numbers from -7 to 7 using 4 bits</caption>
<tbody>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> bits </td>
   <td style="text-align:left;"> 0111 </td>
   <td style="text-align:left;"> 0110 </td>
   <td style="text-align:left;"> 0101 </td>
   <td style="text-align:left;"> 0100 </td>
   <td style="text-align:left;"> 0011 </td>
   <td style="text-align:left;"> 0010 </td>
   <td style="text-align:left;"> 0001 </td>
   <td style="text-align:left;"> 0000 </td>
   <td style="text-align:left;"> 1000 </td>
   <td style="text-align:left;"> 1001 </td>
   <td style="text-align:left;"> 1010 </td>
   <td style="text-align:left;"> 1011 </td>
   <td style="text-align:left;"> 1100 </td>
   <td style="text-align:left;"> 1101 </td>
   <td style="text-align:left;"> 1110 </td>
   <td style="text-align:left;"> 1111 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> y </td>
   <td style="text-align:left;"> 7 </td>
   <td style="text-align:left;"> 6 </td>
   <td style="text-align:left;"> 5 </td>
   <td style="text-align:left;"> 4 </td>
   <td style="text-align:left;"> 3 </td>
   <td style="text-align:left;"> 2 </td>
   <td style="text-align:left;"> 1 </td>
   <td style="text-align:left;"> 0 </td>
   <td style="text-align:left;"> -0 </td>
   <td style="text-align:left;"> -1 </td>
   <td style="text-align:left;"> -2 </td>
   <td style="text-align:left;"> -3 </td>
   <td style="text-align:left;"> -4 </td>
   <td style="text-align:left;"> -5 </td>
   <td style="text-align:left;"> -6 </td>
   <td style="text-align:left;"> -7 </td>
  </tr>
</tbody>
</table>

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>2's Complement Representation of numbers from -8 to 7 using 4 bits</caption>
<tbody>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> bits </td>
   <td style="text-align:left;"> 1000 </td>
   <td style="text-align:left;"> 1001 </td>
   <td style="text-align:left;"> 1010 </td>
   <td style="text-align:left;"> 1011 </td>
   <td style="text-align:left;"> 1100 </td>
   <td style="text-align:left;"> 1101 </td>
   <td style="text-align:left;"> 1110 </td>
   <td style="text-align:left;"> 1111 </td>
   <td style="text-align:left;"> 0000 </td>
   <td style="text-align:left;"> 0001 </td>
   <td style="text-align:left;"> 0010 </td>
   <td style="text-align:left;"> 0011 </td>
   <td style="text-align:left;"> 0100 </td>
   <td style="text-align:left;"> 0101 </td>
   <td style="text-align:left;"> 0110 </td>
   <td style="text-align:left;"> 0111 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> y </td>
   <td style="text-align:left;"> -8 </td>
   <td style="text-align:left;"> -7 </td>
   <td style="text-align:left;"> -6 </td>
   <td style="text-align:left;"> -5 </td>
   <td style="text-align:left;"> -4 </td>
   <td style="text-align:left;"> -3 </td>
   <td style="text-align:left;"> -2 </td>
   <td style="text-align:left;"> -1 </td>
   <td style="text-align:left;"> 0 </td>
   <td style="text-align:left;"> 1 </td>
   <td style="text-align:left;"> 2 </td>
   <td style="text-align:left;"> 3 </td>
   <td style="text-align:left;"> 4 </td>
   <td style="text-align:left;"> 5 </td>
   <td style="text-align:left;"> 6 </td>
   <td style="text-align:left;"> 7 </td>
  </tr>
</tbody>
</table>

# References

Barnett R.; O'Cull L.; Cox, S. Embedded C Programming and the Microship PIC. Delmar Learning, ed. 1, 2004.

Cadenhead, R.; Liberty, J. Sams Teach Yoirself C++. Pearson Education, ed. 6, 2017.

C Data Types - https://en.wikipedia.org/wiki/C_data_types


**Did you find this page helpful? Consider sharing it 🙌**
