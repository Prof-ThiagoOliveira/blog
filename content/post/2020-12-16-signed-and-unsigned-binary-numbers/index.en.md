---
title: Signed and Unsigned Binary Numbers
author: Thiago de Paula Oliveira
date: '2019-12-04'
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
lastmod: '2019-12-04T12:10:51Z'
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
---

# Introduction

When programming in C, a fundamental step is understanding variable assignment. C offers various data types, and here we focus on `int`, used for integer data. There are two primary methods to define an `int` variable:

<div class="div-1">
* **Uninitialized Variable**: Defined simply as `int x;`, this approach does not assign an initial value to the variable $x$ (Figure 1). It's generally advisable to avoid this since it can lead to bugs if $x$ remains unassigned throughout the code. 
* **Initialized Variable**: Assigning a value to $x$ can be done in two ways (Figure 1):
  <div class = "div-2">
    * Single-step declaration - `int x = 3;`
    * Two-step declaration - First, declare with `int x;` then assign with `x = 3;`
  </div>
</div>

<div class="figure" style="text-align: center">
<img src="var_and_exp.png" alt="Declaring variables in C" width="550px" />
<p class="caption">Declaring variables in C</p>
</div>

Additionally, C provides various storage sizes for integer variables. We will briefly introduce this concept. Figure 2 illustrates the representation of integers, either as whole numbers or fixed-point numbers (with a fixed number of digits). Typically, computers use a set number of bits to represent these integers. Common bit-lengths for integers include 8-bit, 16-bit (`short`), 32-bit (`long`), or 64-bit (`long long`). There are two main schemes for integer representation: the signed integer type (`signed int`), which can store values ranging from -32,767 to 32,767, and the unsigned integer type (`unsigned int`), which encompasses values from 0 to 65,535 (calculated as $32767 \times 2 + 1$). The `unsigned` qualifier is particularly useful when dealing exclusively with positive values.

<div class="figure" style="text-align: center">
<img src="binary_number.png" alt="Integer Representation" width="500px" />
<p class="caption">Integer Representation</p>
</div>

Furthermore, there are three representation schemes for signed integers: *Sign-Magnitude Representation*, *1's Complement Representation*, and *2's Complement Representation*. These schemes are crucial for representing negative numbers in binary form. In all these schemes, positive signed binary numbers begin with a 0, while negative numbers start with a 1 (Figure 3).

<div class="figure" style="text-align: center">
<img src="sign_bit.png" alt="Signed binary numbers" width="300px" />
<p class="caption">Signed binary numbers</p>
</div>

A limitation of signed binary numbers is that one bit is dedicated to indicating the sign (positive or negative), leaving the remaining $n-1$ bits for the number's magnitude, ranging from $-2^{n-1}$ to $2^{n-1}$. For instance, in an 8-bit signed binary number, one bit is for the sign, and the remaining seven bits are for the magnitude:

<div class="div-1">
* With Sign-Magnitude Representation:
$$ -|2^{(8-1)}-1| \mbox{ to } 2^{(8-1)}-1 = -127 \mbox{ to } 127 $$
* With 2's Complement Representation:
$$ -2^{(8-1)} \mbox{ to } 2^{(8-1)}-1 = -128 \mbox{ to } 127 $$
</div>

Therefore, using 2's Complement Representation, we can represent numbers from -128 to 127. You might wonder why there's an additional number in the range with 2's Complement. The answer lies in the unique way this representation handles the negative of the lowest negative number, which can be seen in Figure 4.

<div class="figure" style="text-align: center">
<img src="repre_scheme.png" alt="Representation schemes of Sign-Magnitude Representation and 2's Complement Representation" width="400px" />
<p class="caption">Representation schemes of Sign-Magnitude Representation and 2's Complement Representation</p>
</div>

# Dive Into the World of Integer Representations!

Embark on an exhilarating journey through the binary landscape of computer science! We're set to explore the intricate ways of representing integers, both unsigned and signed, using the power of binary digits. This adventure will take us through two riveting examples, complete with R code snippets for a hands-on experience!

## Unveiling the Unsigned Integers
Picture a sequence of numbers $x$, where $x \in \lbrace 0, 1, \ldots, 15 \rbrace$. We're about to represent these numbers as 4-bit unsigned integers. Imagine this: **4 bits**, each a 0 or 1, combining in myriad ways to encapsulate numbers from 0 to 15. Our journey here explores the interval $[0, 2^{4}−1] \in \mathcal{N}_{0}$.

Here's an R snippet to visualize this transformation:

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>Representation of numbers from 0 to 15 in 4 bits</caption>
 <thead>
  <tr>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
  </tr>
 </thead>
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

Prepare to be amazed as simple integers transform into a beautiful array of zeros and ones!

## Deciphering Signed Integers
Next, let's step into the world of signed integers, representing a sequence $y$ within $\{-7, -6, \ldots, 6, 7\}$. With 4 bits at our disposal, one bit becomes the **sign bit**, while the remaining three are **magnitude bits**. This setup enables us to span $y$ within the range $\left[-|2^3-1|, 2^3-1\right] \in \mathcal{Z}$.

Witness the Sign-Magnitude Representation, where the first bit unveils the sign, and the rest narrate the magnitude:

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>Sign-Magnitude Representation of numbers from -7 to 7 using 4 bits</caption>
 <thead>
  <tr>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
  </tr>
 </thead>
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

But the intrigue doesn't end there! Introducing the 2's Complement Representation, a brilliant method to elegantly incorporate negative numbers. This approach allows us to explore the depths of the negative spectrum, all the way to -8:

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>2's Complement Representation of numbers from -8 to 7 using 4 bits</caption>
 <thead>
  <tr>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;">  </th>
  </tr>
 </thead>
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

These examples, enriched with R code for hands-on experimentation! 🌌💻🚀

# Exploring Further: A New Perspective on Integer Representations

Let's delve deeper into the world of integer representations with a fresh example! We'll take a different approach, offering a new perspective to understand and construct binary representations. This time, we'll focus on a practical application that brings these concepts to life.

## Example: Binary Encoding of Characters

Imagine you want to represent characters (like letters and symbols) in binary. This is essential in computer science, as it allows for the storage and transmission of text in a form that computers can process. We'll use the ASCII (American Standard Code for Information Interchange) system, a widely used method to encode characters.

Each character in ASCII is assigned a unique number, and this number is then represented in binary. For example, the upper-case letter 'A' is represented by the number 65 in ASCII, which corresponds to the binary number 01000001.

Here's an R snippet to visualize this transformation for a set of characters:

<table class="table table-striped table-hover" style="margin-left: auto; margin-right: auto;">
<caption>Binary Encoding of Characters Using ASCII</caption>
 <thead>
  <tr>
   <th style="text-align:left;">  </th>
   <th style="text-align:left;"> Char </th>
   <th style="text-align:left;"> ASCII </th>
   <th style="text-align:left;"> Binary </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> A </td>
   <td style="text-align:left;"> A </td>
   <td style="text-align:left;font-family: monospace;"> 41 </td>
   <td style="text-align:left;"> 00000000000000000000000001000001 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> B </td>
   <td style="text-align:left;"> B </td>
   <td style="text-align:left;font-family: monospace;"> 42 </td>
   <td style="text-align:left;"> 00000000000000000000000001000010 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> C </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;font-family: monospace;"> 43 </td>
   <td style="text-align:left;"> 00000000000000000000000001000011 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> D </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;font-family: monospace;"> 44 </td>
   <td style="text-align:left;"> 00000000000000000000000001000100 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> E </td>
   <td style="text-align:left;"> E </td>
   <td style="text-align:left;font-family: monospace;"> 45 </td>
   <td style="text-align:left;"> 00000000000000000000000001000101 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> F </td>
   <td style="text-align:left;"> F </td>
   <td style="text-align:left;font-family: monospace;"> 46 </td>
   <td style="text-align:left;"> 00000000000000000000000001000110 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> G </td>
   <td style="text-align:left;"> G </td>
   <td style="text-align:left;font-family: monospace;"> 47 </td>
   <td style="text-align:left;"> 00000000000000000000000001000111 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> H </td>
   <td style="text-align:left;"> H </td>
   <td style="text-align:left;font-family: monospace;"> 48 </td>
   <td style="text-align:left;"> 00000000000000000000000001001000 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> I </td>
   <td style="text-align:left;"> I </td>
   <td style="text-align:left;font-family: monospace;"> 49 </td>
   <td style="text-align:left;"> 00000000000000000000000001001001 </td>
  </tr>
  <tr>
   <td style="text-align:left;font-weight: bold;border-right:1px solid;"> J </td>
   <td style="text-align:left;"> J </td>
   <td style="text-align:left;font-family: monospace;"> 4a </td>
   <td style="text-align:left;"> 00000000000000000000000001001010 </td>
  </tr>
</tbody>
</table>

This example shows how characters are converted to ASCII values and then to their binary equivalents, demonstrating the practical application of binary representation in everyday computing tasks. Such an understanding is crucial for tasks like data encoding, cryptography, and digital communication.

This fresh perspective, combined with hands-on R code, adds another layer to our understanding of binary representations in the digital world. It's not just about numbers; it's about how even the simplest characters we use every day are translated into a language that computers understand. 🌐🔢🖥️


# Efficiency in Data Storage: Numbers vs. Letters

As we wrap up our exploration of binary representations, it's crucial to understand why storing numbers instead of letters (words) is often more efficient and preferred in terms of memory usage. This principle is key in optimizing data storage and processing in computing systems.

## Why Numbers Trump Letters for Memory Efficiency

### Compact Representation:

- **Fixed Length**: Numbers, especially integers, typically have a fixed-length representation in binary. For example, a 32-bit system will represent all integers using 32 bits, regardless of the value. This uniformity leads to more predictable and efficient memory usage.
- **Greater Density**: A single number can represent a large range of values. For example, a 32-bit integer can represent over 4 billion different values, while 32 bits allocated for characters might only store a few words.

### Processing Speed:

- **Simpler Operations**: Numerical data allows for more straightforward and faster arithmetic operations compared to string processing, which involves character-by-character manipulation.
- **Optimized Hardware**: Computer processors are inherently designed to handle numerical calculations efficiently. Operations on numbers are generally faster due to hardware-level optimizations.

### Memory Management:

- **Less Overhead**: Storing numbers reduces the need for additional memory overhead compared to strings. For instance, numbers do not require extra characters for delimiters or markers that are often needed in text.
- **Indexing and Searching**: It's quicker to index and search through numerical data compared to textual data. This efficiency is crucial in database operations and large-scale data processing.

### Application in Real-World Scenarios:

- **Encoding Complexity**: Complex data like images, videos, and sound are more efficiently stored and processed as numerical values rather than trying to represent them as lengthy strings of text.
- **Data Analysis and Machine Learning**: Numerical data is more amenable to statistical analysis and machine learning algorithms, which rely heavily on numerical inputs for predictions and insights.

In summary, while both numbers and letters have their place in data representation, the choice often boils down to efficiency and suitability for the task at hand. For tasks requiring compact storage, fast processing, and efficient manipulation, numbers usually offer significant advantages over letters or words. This principle of choosing the right data type for the right purpose is fundamental in the field of computer science and data management. 🌍💾🚀

# References

Barnett R.; O'Cull L.; Cox, S. Embedded C Programming and the Microship PIC. Delmar Learning, ed. 1, 2004.

Cadenhead, R.; Liberty, J. Sams Teach Yoirself C++. Pearson Education, ed. 6, 2017.

C Data Types - https://en.wikipedia.org/wiki/C_data_types



# Citation

1. For attribution, please cite this work as:

<div class="div-1">
Oliveira T.P. (2020, Dec. 16). Signed and Unsigned Binary Numbers
</div>

2. BibTeX citation

```
@misc{oliveira2020signed,
  author = {Oliveira, Thiago},
  title = {Signed and Unsigned Binary Numbers},
  url = {https://prof-thiagooliveira.netlify.app/post/signed-and-unsigned-binary-numbers/},
  year = {2020}
}
```

**Did you find this page helpful? Consider sharing it 🙌**

<style>
/* ====== Post-only layout + typography polish (Hugo Blox / Tailwind) ====== */
/* Place this at the very end of the post so it wins the cascade. */

/* 0) Widen the page shell Hugo Blox uses around articles */
.page-body > .mx-auto,
.page-body .max-w-screen-xl{
  max-width: 100vw !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 1) Remove the Tailwind max-w cap on the <main> inside <article> */
.page-body article > main{
  max-width: none !important;  /* beats .max-w-6xl */
  width: 100% !important;
}

/* 2) Control the actual reading width (fluid per breakpoint) */
.page-body article .prose{
  /* Base: a touch larger with comfy line height */
  font-size: clamp(1rem, 0.96rem + 0.25vw, 1.12rem);
  line-height: 1.75;
  text-align: left;
  margin-inline: auto;

  /* Reading width: scale up on big screens, but keep lines readable */
  max-width: 86ch !important; /* default desktop */
}
@media (min-width: 1024px){  /* lg */
  .page-body article .prose{ max-width: 96ch !important; }
}
@media (min-width: 1280px){  /* xl */
  .page-body article .prose{ max-width: 102ch !important; }
}
@media (min-width: 1536px){  /* 2xl / very wide */
  .page-body article .prose{ max-width: 108ch !important; }
}

/* 3) Phones/tablets: full width with side padding */
@media (max-width: 768px){
  .page-body article .prose{
    max-width: 100% !important;
    padding-inline: 1rem;
  }
}

/* 4) Give the article more room by slimming sidebars on wide screens */
@media (min-width: 1280px){
  .hb-sidebar-container, .hb-toc { width: 12rem !important; } /* was 16rem */
}
@media (max-width: 1279.98px){
  .hb-sidebar-container{ display:none !important; } /* hide sidebar under xl */
}

/* --------- Clean, professional type polish (scoped to post content) -------- */
.page-body article .prose p{
  margin: 0 0 1.15em;
  text-wrap: pretty;
  hyphens: auto;
}

.page-body article .prose h1{
  font-size: clamp(1.9rem, 1.6rem + 1.2vw, 2.3rem);
  margin: 1.2em 0 .5em;
  padding-bottom: .25em;
  border-bottom: 2px solid #e5e7eb;
}
.page-body article .prose h2{
  font-size: clamp(1.4rem, 1.2rem + 0.6vw, 1.7rem);
  margin: 1.35em 0 .4em;
  padding-bottom: .2em;
  border-bottom: 1px solid #e5e7eb;
}
.page-body article .prose h3{
  font-size: clamp(1.15rem, 1.05rem + 0.35vw, 1.35rem);
  margin: 1.1em 0 .3em;
}

/* Links: subtle underline-on-hover */
.page-body article .prose a{
  color: #2f6ab5;
  text-decoration: none;
  border-bottom: 1px solid rgba(47,106,181,.25);
}
.page-body article .prose a:hover{
  color: #1f4f8f;
  border-bottom-color: currentColor;
}

/* Code blocks & inline code */
.page-body article .prose pre{
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 14px;
  overflow: auto;
}
.page-body article .prose code{
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  padding: .15em .35em;
  font-size: .95em;
}
.page-body article .prose pre code{
  background: none; border: 0; padding: 0; font-size: 0.95em;
}

/* Tables */
.page-body article .prose table{
  width: 100%;
  border-collapse: collapse;
  margin: 1.2rem 0;
  font-variant-numeric: tabular-nums;
}
.page-body article .prose th,
.page-body article .prose td{
  border: 1px solid #e5e7eb;
  padding: .6rem .75rem;
}
.page-body article .prose thead th{
  background: #2f6ab5;
  color: #fff;
  text-align: left;
}

/* Images & figures */
.page-body article .prose img{ border-radius: 6px; }

/* Optional: allow “full-bleed” wide elements
   Add class="wide" to a block (table/pre/img wrapper) to span the viewport. */
.page-body article .prose .wide{
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding-inline: clamp(12px, 4vw, 36px);
}

/* Footer timestamp spacing */
.page-body article time{ margin-top: 2rem; display: block; }

/* Dark mode tweaks */
html.dark .page-body article .prose pre,
html.dark .page-body article .prose code{
  background: #111826;
  border-color: #253041;
}
html.dark .page-body article .prose thead th{ background: #5aa0ff; }
</style>

