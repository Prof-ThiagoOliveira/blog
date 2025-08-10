---
title: Expressions in C++
author: Thiago de Paula Oliveira
date: '2020-02-16'
slug: expressions
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
lastmod: '2024-01-06T12:15:54Z'
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

<style>
/* Blog post container */
body {
   font-family: 'Helvetica Neue', Arial, sans-serif;
   font-size: 1rem;
   line-height: 1.8;
   color: #333;
   text-align: justify;
   background-color: #fafafa;
   margin: 0;
   padding: 0 20px;
}

/* Header styling */
h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
  font-weight: 600; /* Semi-bold for a professional look */
  margin-bottom: 0.75em; /* Slightly reduced bottom margin */
  color: #0d0d0d;
  line-height: 1.2;
  margin-top: 1.5em; /* Added top margin for consistency */
}

h1 {
  font-size: 1.75rem; 
  border-bottom: 2px solid #3b80d1;
  padding-bottom: 0.3em; /* Padding for visual separation */
  margin-top: 1em; 
}

h2 {
  font-size: 1.5rem; 
  color: #3b80d1;
  padding-bottom: 0.2em; /* Padding for visual separation */
}

h3 {
  font-size: 1.25rem; 
  color: #333;
}

h4 {
  font-size: 1.125rem; 
  color: #333;
}

h5 {
  font-size: 1rem; 
  color: #333;
}

h6 {
  font-size: 0.875rem; 
  color: #333;
}

/* Link styling */
a {
  color: #3b80d0;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #1a57a0;
}

/* Code styling */
pre, 
.code-input {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  margin: 20px 0;
  overflow-x: auto;
}

code {
  font-size: 0.9rem;
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  text-align: left;
}

th, 
td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #3b80d1;
  color: white;
}

/* Div options - color box text */
.div-1 {
  color: black;
  background-color: #d6edd3;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

.div-2 {
  color: black;
  background-color: #cfbe7e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

/* Article content */
.article-content {
  text-align: justify;
}

/* Image styling */
img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 1.5em;
}
</style>

# Introduction


Expressions in C++ are fundamental constructs made up of operators, constants, and variables, following the language's syntactical rules. Every expression is a segment of a code that returns a value. For instance:

<img src="exp1.png" width="320px" style="display: block; margin: auto;" />

This example demonstrates the creation of variables to store values: a box for `\(x\)` and another for `\(y\)`, where `\(y\)` equals the expression `\(x + 13\)` (thus, `\(y = 23\)`). Now, let's delve into a more complex example:

<img src="exp2.png" width="500px" style="display: block; margin: auto;" />

This statement encompasses three expressions:
<div class="div-1">
* The results of the expression `\(3 - x\)` is stored in the variable `\(y\)`
* The expression `\(y = 3 - x\)` returns the value of `\(y\)`, and it is stored in the variable `\(v\)`
* The results of the expression `\(y \times \left(\frac{v}{5} + x\right)\)` is stored in the variable `\(z\)`
</div>

It's essential to remember the precedence of operations: multiplication and division are executed before addition and subtraction. For example:
```
1-3*4 = -11
2/3-4*2/3 = -2
2/3-4/4*2/3 = 0
```

**Operator precedence** in `C++` determines the sequence of operations in an expression. Operators have a specific order of execution relative to others. For instance, in the expression `\(\frac{2}{4} - 3 + 4 \times 6\)`, the subexpressions `\(\frac{2}{4}\)`` and `$4 \times 6$ are calculated first, followed by the addition and subtraction. When operators have the same precedence, their associativity dictates the order - either left-to-right or right-to-left.

<div class="figure" style="text-align: center">
<img src="exp3.png" alt="Precedence order" width="300px" />
<p class="caption"><span id="fig:unnamed-chunk-3"></span>Figure 1: Precedence order</p>
</div>

**Associativity** specifies the order of operations for operators with the same precedence level. It can be left-to-right or right-to-left. Typically, addition, subtraction, multiplication, and division are left-associative, while assignment operators are right-associative. Some operators are non-associative, meaning their behaviour is undefined if used sequentially in an expression. Parentheses can alter the default associativity, enforcing a specific order.

<div class="figure" style="text-align: center">
<img src="exp4.png" alt="Example of left-associative, right-associative, and non-associative" width="800px" />
<p class="caption"><span id="fig:unnamed-chunk-4"></span>Figure 2: Example of left-associative, right-associative, and non-associative</p>
</div>

# Using Parentheses `()`

The operator `()` has the highest precedente order (see <a href="#table1">Table 1</a>), as consequence, we can use parentheses to change the sequence of operators. 
Consider the following example:

```
5 + 6 * 7
```
The `*` operator is evaluated firstly, followed by the `+` operator, so the result is `\(5+6\times 7 = 47\)`. However, if we want to account for the addiction first and then the multiplication, we can rewrite the code as:
```
(5 + 6) * 7
```
Then, the program will compute `\(\left(5+6\right)\times 7=11\times 7=77\)`. Sometimes, parentheses' inclusion should be important to make your code easier to understand, and therefore easier to maintain.

# Modulus operator (%)

The modulus operator evaluates the remainder when dividing the first operand by the second one. Ex.: `a % b` is the remainder when `\(a\)` is divided<table class="wikitable">

 by `\(b\)` (`\(a\)` modulus `\(b\)`).<table class="wikitable"> by `\(b\)` (`\(a\)` modulus `\(b\)`).

<div class="figure" style="text-align: center">
<img src="exp5.png" alt="Example of modulus" width="300px" />
<p class="caption"><span id="fig:unnamed-chunk-5"></span>Figure 3: Example of modulus</p>
</div>

<div class="div-1">
* Dividing an integer by another one gives an integer.
</div>

## Example:
```
int x = 10;
int y = 3;

x/y = 10/3 = 3 (dividing two integers)

x % y = 1 (modulus)
```

# Short hand or syntatic sugar

Short hand expressions provide a straightforward way to write common patterns over the algorithm for initialized variables. 

| Short hand | Meaning         |              Prefix and Postfix                 | 
|------------|-----------------|-------------------------------------------------|
| `\(x+=y\)`     | `\(x=x+y\)`         |                                                 |
| `\(x-=y\)`     | `\(x=x-y\)`         |                                                 |
| `\(x*=y\)`     | `\(x= x \times y\)` |                                                 |
| `\(x/=y\)`     | `\(x=x/y\)`         |                                                 |    
| `\(x++\)`      | `\(x=x+1\)`         | Return the value of `\(x\)` first then increment it |
| `\(++x\)`      | `\(x=x+1\)`         | Increment first then return the value of `\(x\)`    |
| `\(x--\)`      | `\(x=x-1\)`         | Return the value of `\(x\)` first then increment it |
| `\(--x\)`      | `\(x=x-1\)`         | Increment first then return the value of `\(x\)`    |

## Example 1:

Here you can see that `y ++= x * z;` is calculate as `\(y=y+x \times z = 30 + 2 \times 4 = 38\)`.

<img src="example1.png" width="350px" style="display: block; margin: auto;" />


## Example 2:

In this example you can see that we used the postfix `x++` to first initialize `\(y\)` (`\(y=8 \times x = 8 \times 7 = 56\)`) and then update `\(x\)` to ```x=x+1=8```. On the other hand, we used the prefix `--y` to first update the variable `\(y\)` to `y=y-1=55` and then calculate the variable z using the updated `\(y\)` `\(\left(z = y/5 = 55/5 = 11 \right)\)`. 

<img src="example2.png" width="500px" style="display: block; margin: auto;" />

Note that when we use `x*= (y/z) % 2` the variable `\(x\)` multiply the entire expression after `=` symbol. This expression is equivalent to `x = x * ((y/z) % 2));`. 

# Operator precedence and associativity

<a href="#table1">Table 1</a> shows a list of precedence (ordered) and associativity of C operators. This table was obtained from 
<a href="https://en.cppreference.com/w/c/language/operator_precedence#cite_note-1">cppreference.com</a>.

<div>
<table class="wikitable">
<tbody><tr>
<a name="table1"> Table 1: Precedence and associativity of C operators </a>
<th style="text-align: left"> Precedence
</th>
<th style="text-align: left"> Operator
</th>
<th style="text-align: left"> Description
</th>
<th style="text-align: left"> Associativity
</th></tr>
<tr>
<th rowspan="6"> 1
</th>
<td style="border-bottom-style: none"> <code>++</code> <code>\-\-</code>
</td>
<td style="border-bottom-style: none"> Suffix/postfix increment and decrement
</td>
<td style="vertical-align: top" rowspan="6"> Left-to-right
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>()</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Function call
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>[]</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Array subscripting
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>.</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Structure and union member access
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>-&gt;</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Structure and union member access through pointer
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>(<i>type</i>){<i>list</i>}</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Compound literal<span class="t-mark-rev t-since-c99">(C99)</span>
</td></tr>
<tr>
<th rowspan="8"> 2
</th>
<td style="border-bottom-style: none"> <code>++</code> <code>\-\-</code>
</td>
<td style="border-bottom-style: none"> Prefix increment and decrement<sup id="cite_ref-1" class="reference"><a href="#cite_note-1">[note 1]</a></sup>
</td>
<td style="vertical-align: top" rowspan="8"> Right-to-left
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>+</code> <code>-</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Unary plus and minus
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>!</code> <code>~</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Logical NOT and bitwise NOT
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>(<i>type</i>)</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Cast
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>*</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Indirection (dereference)
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>&amp;</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Address-of
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>sizeof</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Size-of<sup id="cite_ref-2" class="reference"><a href="#cite_note-2">[note 2]</a></sup>
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>_Alignof</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Alignment requirement<span class="t-mark-rev t-since-c11">(C11)</span>
</td></tr>
<tr>
<th> 3
</th>
<td> <code>*</code> <code>/</code> <code>%</code>
</td>
<td> Multiplication, division, and remainder
</td>
<td style="vertical-align: top" rowspan="11"> Left-to-right
</td></tr>
<tr>
<th> 4
</th>
<td> <code>+</code> <code>-</code>
</td>
<td> Addition and subtraction
</td></tr>
<tr>
<th> 5
</th>
<td> <code>&lt;&lt;</code> <code>&gt;&gt;</code>
</td>
<td> Bitwise left shift and right shift
</td></tr>
<tr>
<th rowspan="2"> 6
</th>
<td style="border-bottom-style: none"> <code>&lt;</code> <code>&lt;=</code>
</td>
<td style="border-bottom-style: none"> For relational operators &lt; and ≤ respectively
</td></tr>
<tr>
<td style="border-top-style: none"> <code>&gt;</code> <code>&gt;=</code>
</td>
<td style="border-top-style: none"> For relational operators &gt; and ≥ respectively
</td></tr>
<tr>
<th> 7
</th>
<td> <code>==</code> <code>!=</code>
</td>
<td> For relational = and ≠ respectively
</td></tr>
<tr>
<th> 8
</th>
<td> <code>&amp;</code>
</td>
<td> Bitwise AND
</td></tr>
<tr>
<th> 9
</th>
<td> <code>^</code>
</td>
<td> Bitwise XOR (exclusive or)
</td></tr>
<tr>
<th> 10
</th>
<td> <code>|</code>
</td>
<td> Bitwise OR (inclusive or)
</td></tr>
<tr>
<th> 11
</th>
<td> <code>&amp;&amp;</code>
</td>
<td> Logical AND
</td></tr>
<tr>
<th> 12
</th>
<td> <code>||</code>
</td>
<td> Logical OR
</td></tr>
<tr>
<th> 13
</th>
<td> <code>?:</code>
</td>
<td> Ternary conditional<sup id="cite_ref-3" class="reference"><a href="#cite_note-3">[note 3]</a></sup>
</td>
<td style="vertical-align: top" rowspan="6"> Right-to-Left
</td></tr>
<tr>
<th rowspan="5"> 14<sup id="cite_ref-4" class="reference"><a href="#cite_note-4">[note 4]</a></sup>
</th>
<td style="border-bottom-style: none"> <code>=</code>
</td>
<td style="border-bottom-style: none"> Simple assignment
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>+=</code> <code>-=</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Assignment by sum and difference
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>*=</code> <code>/=</code> <code>%=</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Assignment by product, quotient, and remainder
</td></tr>
<tr>
<td style="border-bottom-style: none; border-top-style: none"> <code>&lt;&lt;=</code> <code>&gt;&gt;=</code>
</td>
<td style="border-bottom-style: none; border-top-style: none"> Assignment by bitwise left shift and right shift
</td></tr>
<tr>
<td style="border-top-style: none"> <code>&amp;=</code> <code>^=</code> <code>|=</code>
</td>
<td style="border-top-style: none"> Assignment by bitwise AND, XOR, and OR
</td></tr>
<tr>
<th> 15
</th>
<td> <code>,</code>
</td>
<td> Comma
</td>
<td> Left-to-right
</td></tr></tbody></table>
<ol class="references">
<li id="cite_note-1"><span class="mw-cite-backlink"><a href="#cite_ref-1">↑</a></span> <span class="reference-text">The operand of prefix <code>++</code> and <code>\-\-</code> can't be a type cast. This rule grammatically forbids some expressions that would be semantically invalid anyway. Some compilers ignore this rule and detect the invalidity semantically.</span>
</li>
<li id="cite_note-2"><span class="mw-cite-backlink"><a href="#cite_ref-2">↑</a></span> <span class="reference-text">The operand of <code>sizeof</code> can't be a type cast: the expression <code>sizeof (int) * p</code> is unambiguously interpreted as <code>(sizeof(int)) * p</code>, but not <code>sizeof((int)*p)</code>.</span>
</li>
<li id="cite_note-3"><span class="mw-cite-backlink"><a href="#cite_ref-3">↑</a></span> <span class="reference-text">The expression in the middle of the conditional operator (between <code><b>?</b></code> and <code><b>:</b></code>) is parsed as if parenthesized: its precedence relative to <code>?:</code> is ignored.</span>
</li>
<li id="cite_note-4"><span class="mw-cite-backlink"><a href="#cite_ref-4">↑</a></span> <span class="reference-text">Assignment operators' left operands must be unary (level-2 non-cast) expressions. This rule grammatically forbids some expressions that would be semantically invalid anyway. Many compilers ignore this rule and detect the invalidity semantically. For example, <span class="t-c"><span class="mw-geshi c source-c">e <span class="sy1">=</span> a <span class="sy1">&lt;</span> d <span class="sy4">?</span> a<span class="sy2">++</span> <span class="sy4">:</span> a <span class="sy1">=</span> d</span></span> is an expression that cannot be parsed because of this rule. However, many compilers ignore this rule and parse it as <span class="t-c"><span class="mw-geshi c source-c">e <span class="sy1">=</span> <span class="br0">(</span> <span class="br0">(</span><span class="br0">(</span>a <span class="sy1">&lt;</span> d<span class="br0">)</span> <span class="sy4">?</span> <span class="br0">(</span>a<span class="sy2">++</span><span class="br0">)</span> <span class="sy4">:</span> a<span class="br0">)</span> <span class="sy1">=</span> d <span class="br0">)</span></span></span>, and then give an error because it is semantically invalid.</span>
</li>
</ol>
</div>

## Impact of Data Types on Expressions

In `C++`, the data type of the variables involved in an expression significantly impacts the result. For instance, dividing two integers results in an integer, while using at least one floating-point number yields a floating-point result. Understanding how data types interact within expressions is crucial for accurate calculations and avoiding common pitfalls like integer truncation.

Here are some key points about integer truncation and other common pitfalls in C++:

1. **Integer Truncation**: This occurs when the result of a division or other operation between integers is a floating-point number, but the data type is an integer. For example, `int result = 5 / 2;` will store `2` in `result`, not `2.5`, as the fractional part is truncated.

2. **Implicit Type Conversions**: `C++` automatically converts types in certain situations, which can lead to unexpected results. For instance, mixing signed and unsigned integers in expressions can cause unexpected behaviours due to implicit type conversions.

3. **Overflow and Underflow**: This happens when a variable is assigned a value outside its range. For example, storing a value larger than the maximum value that an `int` can hold will result in overflow, leading to unexpected values.

4. **Precision Loss in Floating-Point Numbers**: Floating-point variables can lose precision, especially when dealing with very large or very small numbers. This can result in rounding errors in calculations.

5. **Division by Zero**: This can occur if a program inadvertently divides a number by zero. It's a critical error in `C++` and can cause a program to crash or behave unpredictably.

6. **Uninitialized Variables**: Using variables before initializing them can lead to unpredictable results, as they may contain random data.

7. **Pointer Errors**: Common mistakes with pointers include dereferencing a null or uninitialized pointer, pointer arithmetic errors, and memory leaks.

8. **Operator Precedence Mistakes**: Misunderstanding the order in which operations are performed can lead to bugs. For example, assuming that `a + b * c` adds `a` and `b` before multiplying by `c` (it doesn't; multiplication is done first).

9. **Assuming Size of Data Types is Constant**: The size of data types like `int` can vary depending on the system. Assuming a constant size can lead to errors, particularly when performing operations like bit manipulation or working with binary file formats.

10. **Not Checking the Return Value of Functions**: When functions return values to indicate success or failure, not checking these can lead to the program continuing as if nothing went wrong, even when errors have occurred.


## Role of Type Casting in Expressions

Type casting in expressions can be used to explicitly convert data from one type to another. This technique is particularly useful in situations where operations between different data types are necessary. For example, casting an integer to a float in a division operation to obtain a floating-point result. However, it's important to use type casting judiciously to maintain the precision and integrity of data.

## The Significance of Expression Evaluation Order

While operator precedence and associativity rules dictate the order of operations in an expression, the sequence in which expressions are evaluated can also be influenced by function calls, side effects, and sequence points. Understanding how `C++` evaluates expressions, especially in complex statements, is essential for debugging and writing predictable code.

## Compiler Optimizations and Expressions

Modern `C++` compilers often optimize expressions to enhance performance. These optimizations might include reordering operations (while respecting the language rules), eliminating redundant calculations, or simplifying expressions at compile time. Being aware of these potential optimizations can help in writing more efficient code and understanding any discrepancies between the written code and its execution behaviour.

## Best Practices for Writing Expressions

To maintain readability and reduce errors in `C++`, it's advisable to write clear and simple expressions. Avoid overly complex expressions, use parentheses to clarify order of operations, and follow coding standards and guidelines. Readable expressions are easier to debug, maintain, and understand, especially in collaborative environments.

Adding these paragraphs can provide a more comprehensive and nuanced understanding of expressions in `C++`, catering to both beginners and experienced programmers.

# References

* C Operator Precedence - https://en.cppreference.com/w/c/language/operator_precedence#cite_note-1


# Citation

1. For attribution, please cite this work as:

<div class="div-1">
Oliveira T.P. (2020, Dec. 16). Expressions in C++
</div>

2. BibTeX citation

```
@misc{oliveira2020expression,
  author = {Oliveira, Thiago},
  title = {Expressions in C++},
  url = {https://prof-thiagooliveira.netlify.app/post/expressions/},
  year = {2020}
}
```

**Did you find this page helpful? Consider sharing it 🙌**
                       
