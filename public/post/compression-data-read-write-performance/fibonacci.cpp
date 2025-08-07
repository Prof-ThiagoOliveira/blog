#include <Rcpp.h>
using namespace Rcpp;

// [[Rcpp::export]]
int fibonacci(int x) {
  return (x < 2) ? x : fibonacci(x - 1) + fibonacci(x - 2);
}
