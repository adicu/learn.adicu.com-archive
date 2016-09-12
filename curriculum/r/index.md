---
layout: curriculum
title: Getting to Know R
tagline: A tutorial for first-time R users
author: Kristy Choi
email: eyc2120@columbia.edu
---

1. TOC
{:toc}

## Getting Started

R is a computer language designed for easy statistical computing. It's a
favorite since it's free and open-source, meaning that if you have a
problem, someone has probably already written a package that can solve
it for you.

But before we can start some heavy-duty number crunching, let's get to
know R a little better. You can think of R as that really smart kid in
class who's super cool but still kinda socially awkward at the same
time. The first couple encounters might be slightly painful because R is
really...quirky. But it's totally worth it because in the end, you'll
make a brand new best friend who will make your life infinitely easier.


### Installing R

You can install the appropriate version of R, depending on whether you
have a [Mac](http://cran.r-project.org/bin/macosx/), [Windows
PC](http://cran.r-project.org/bin/windows/base/), or [Linux
machine](http://cran.us.r-project.org/).

### Using R Packages

One of R's most useful features is the ability to load and use packages
that have everything ranging from datasets to functions. R comes with a
variety of packages to begin with, which you can load with the following
command:

```R
# the MASS package comes with a lot of useful statistical tools
> library(MASS)
```

If you want to use a package that doesn't already come with your current
R distribution, you can call the install.packages() function:

```R
# ggplot2 is a really cool graphing library!
> install.packages('ggplot2')
> library(ggplot2)
```

### IDE

I'm personally a fan of
[RStudio](http://www.rstudio.com/products/rstudio/download/), which is
an integrated development environment (IDE) that makes it a lot easier
to code in R. It offers a nice interface for writing R scripts and helps
in the debugging process. Of course it's not required, but I highly
recommend it :)

### What will this tutorial teach me?

This tutorial is designed to get you comfortable with working in the R
environment.

### Running the Sample Code

You can find sample code on
[GitHub](https://github.com/eyc2120/R-tutorial).

## Basic Syntax

R is processed by an interpreter, so you enter input into the prompt ">"
and immediately receive a response.

```R
> 1 + 2
[1] 3

> (3+2)^2
[1] 25

> sqrt(2)*sin(1)
[1] 1.19002

> "hey, how are you?"
[1] "hey, how are you?"

> # this is a comment. nothing happens when I press enter.
>
```

You can store values by assigning them a name, which gives you a
**variable**.

```R
> var = 4
> var <- 4
```

Both expressions store the number 4 into a variable `var`, and we can
use this variable for subsequent operations. Note that the `=` sign can
be replaced by an arrow `<-`. We'll use these two interchangeably. The
nuances between the two become more important later on, but we'll skip
it for now.

```R
# this is an example of variable assignment.
> var <- var + 5
> var
[1] 9
```

There are also a few special values in R that are worth noting. `Inf`
denotes infinity, while `NaN` is "not a number," or undefined. These
values have distinct properties.

```R
> infinity <- 1/0
> print(infinity)
[1] Inf

> infinity - 100
[1] Inf

> undef <- 0/0
> undef
[1] NaN

> Inf - Inf
[1] NaN

> NaN + 1
[1] NaN
```

`NA` denotes "not available," and are usually seen in datasets with
missing values. These usually cause problems when we want to analyze the
data, so oftentimes we'll want to remove them.

Let's say we have a vector called **missing** and see what happens if we
take the mean.

```R
> missing
 [1] NA  2  4  6  7 10 NA NA  4  3

> mean(missing)
[1] NA
```

Doh, we're stuck. Fortunately, many of R's functions come built-in with
mechanisms to ignore them. (Which also serves as a nice transition to
the next section.)

```R
> mean(missing, na.rm=TRUE)
[1] 5.142857
```

### Useful Functions

Some other functions that are helpful to know are listed below. Let's
start with a vector called `x`.

```R
> x
[1]  1  3  5  7  9 11 13 15
```

What sorts of things can we do with `x`? Well, we'd probably like to
summarize it in some way using basic statistics. R provides these for
us.

```R
# this is the standard deviation. how would you find the variance?
> sd(x)
[1] 4.898979

> min(x)
[1] 1

> max(x)
[1] 15

> range(x)
[1]  1 15
```

If that's too much,  you can use the built-in `summary()` function to
do most of the work for you.

```R
# basic summary statistics:
> summary(x)
   Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
    1.0     4.5     8.0     8.0    11.5    15.0
```

Some other functions are:

```R
> sum(x)
[1] 64

# cumulative sum --> other variations exist like "cummin" and "cumprod"
> cumsum(x)
[1]  1  4  9 16 25 36 49 64

> prod(x)
[1] 2027025

# this is just the absolute value
> abs(-2)
[1] 2
```

### Logic Operations

R also holds vectors (which we'll cover in more detail later) of
**logical values**, or just `TRUE` and `FALSE`. These can be abbreviated
to `T` and `F`. Logical values will prove to be tremendously helpful
when we want to filter out things we don't need. For example:

```R
> x
[1]  1  3  5  7  9 11 13 15

> x>5
[1] FALSE FALSE FALSE  TRUE  TRUE  TRUE  TRUE  TRUE
```

The operations are fairly standard: `<` for less than, `>` for
greater than, `=<` for less than or equal to, `>=` for greater than
or equal to, `==` for equal to, and `!=` for not equal to.

So if we wanted to know if there was an element in `x` that was equal
to 7:

```R
> x == 7
[1] FALSE FALSE FALSE  TRUE FALSE FALSE FALSE FALSE
```

Well that's nice. But it's also really annoying to try and spot the lone
`TRUE` among all the `FALSE`s. Can R just tell us where it is?

```R
> which(x==7)
[1] 4

> x[4]
[1] 7
```

Yup, the `which()` function tells us that it was the 4th element of x.
Don't worry if the brackets don't make sense just yet -- we'll cover
them in the next section.

There are also boolean operators, which allow us to combine more than
one logical operation. The **&** denotes the logical "and," while the
**|** denotes the logical "or". The exclamation mark **!** stands for
the unary "not."

Let's combine everything we've learned and see what we can do.

```R
# let's find all values in x that are either less than or equal to 3 or
# greater than 8.
> (x <= 3) | (x > 8)
[1]  TRUE  TRUE FALSE FALSE  TRUE  TRUE  TRUE  TRUE

> indices <- which((x <= 3) | (x > 8))
> indices
[1] 1 2 5 6 7 8

> x[indices]
[1]  1  3  9 11 13 15
```

The functions `any()` or `all()` check if a condition is true for --
you guessed it -- any or all values of a certain vector.

```R
> any(x>2)
[1] TRUE

> all(x>2)
[1] FALSE
```

Just for reference, the `!` operator negates any logical value.

```R
> all(x>2)
[1] FALSE

> !all(x>2)
[1] TRUE
```

## Vectors

Vectors are key to everything that R does. Each vector has two
characteristics: a **mode** and a **length**.

```R
> x
[1]  1  3  5  7  9 11 13 15

> mode(x)
[1] "numeric"

> length(x)
[1] 8
```

There are four possible modes in R: "numeric" for numbers, "logical" for
logic values, "complex" for complex numbers, and "character" for
character values.

You can make a vector by using the `c()` function. It's easier to
think about `c` as short for "concatenate".

```R
> myVector <- c(1,2,3,4)
> myVector
[1] 1 2 3 4

> array = c('a','b','c')
> array
[1] "a" "b" "c"
> mode(array)
[1] "character"
```

The `c()` function isn't limited to solely concatenating scalars. You
can also mash two vectors together.

```R
> newVec <- c(myVector, myVector)
> newVec
[1] 1 2 3 4 1 2 3 4
```

You can also use the **sequence operator** `:` to generate a vector, or
the `seq()` function if you want to skip by more than 1 at a time.

```R
> 1:5
[1] 1 2 3 4 5

> 3:-3
[1] 3 2 1 0 -1 -2 -3

# here we're incrementing by steps of size 1.5
> seq(1,10,1.5)
[1] 1.0 2.5 4.0 5.5 7.0 8.5 10.0
```

Or you can just intuitively use the `vector()` function and supply the
arguments of mode and length.

```R
# this fills myVec with 0's to begin with
> myVec <- vector("numeric",3)
> myVec
[1] 0 0 0
```

You can also give the elements of your vector names! Take a look:

```R
> myVector
[1] 1 2 3 4

> names(myVector)
NULL

> names(myVector) <- c("a","b","c","d")
> myVector
a b c d
1 2 3 4
```

### Vector Operations

So what do you do with these vectors? Well, you can perform simple
vector arithmetic, which performs operations element-wise.

```R
# vector addition
> y <- c(1,2,3) + c(4,5,6)
> y
[1] 5 7 9

# square root operation
> x <- c(1,2,3)
> sqrt(x)
[1] 1.000000 1.414214 1.732051
```

One thing to be careful about is the **recycling rule**, which expands
the shorter vector's dimensions to match that of the longer vector. This
is more easily demonstrated in an example:

```R
> c(1,2,3,4) + c(1,2)
[1] 2 4 4 6
```

What happened here? Well, we "recycled" the elements of the shorter
vector so that the addition would make sense. So the expression became
`c(1,2,3,4) + c(1,2,1,2)` because we repeated the two elements from the
second vector in order to match the first vector's dimensions.

Other useful operations include, but are not limited to:

- `+` addition
- `- subtraction
- `*` multiplication
- `/` division
- `^` raising to power
- `%%` modulo (remainder after division)
- `%/%` integer division
- `%*%` matrix multiplication

### Subsets

Sometimes we only want to work with certain parts of a vector, as
opposed to the whole thing. Then we can **subset** the vector for quick
and easy access.

```R
> bigVec <- 1:10
# what does bigVec look like?

> bigVec[7]
[1] 7
```

R is similar to MATLAB in that the starting index is 1, instead of 0.
Try indexing by 0 and R will get mad. Actually, let's try it. What
happens?

```R
> bigVec[0]
integer(0)
```

Huh. This is strange. What is `integer(0)`? Is it 0? Let's play around
with it and see what happens.

```R
> bigVec[0] + 1
numeric(0)

>bigVec[0] + 100000
numeric(0)
```

Okay, so we know that integer(0) or `numeric(0)` is in no way the number
zero. In fact, this is R's way of telling us that the result of
`bigVec[0]` is actually a **vector of length zero**, or an empty vector.
You can think of the value returned by `bigVec[0]` as `[ ]`.

```R
> length(bigVec[0])
[1] 0
```

So now we know that we need to be careful about indexing when we want to
subset vectors in R. Great. What else can we do other than extracting
individual values?

We can subset by multiple elements using either **c()** or **:**.

```R
> bigVec[3:7]
[1] 3 4 5 6 7

> bigVec[c(2,4,6)]
[1] 2 4 6

> bigVec[c(1:5,9)]
[1] 1 2 3 4 5 9
```

Awesome. And if we just want to exclude a value or two, we can use the
`-` sign.

```R
# we want everything but the last value
> bigVec[-length(bigVec)]
[1] 1 2 3 4 5 6 7 8 9

> bigVec[-c(2,5,7)]
[1]  1  3  4  6  8  9 10
```

We can also subset vectors by logical operations:

```R
> bigVec[bigVec>5]
[1]  6  7  8  9 10

# what would this return?
> bigVec[bigVec%%2 != 0]
```

And as you can probably guess, we can change values inside these
vectors, too.

```R
> bigVec[3:5] = 0
> print(bigVec)
 [1]  1  2  0  0  0  6  7  8  9 10
```

### Lists

So vectors are at the heart of everything that R does, but a potential
problem is that all elements of a vector have to be the same type.
That's why R uses lists to store different typed-things in a single
object.

```R
> myList <- list("a", TRUE, 15)
> myList
[[1]]
[1] "a"

[[2]]
[1] TRUE

[[3]]
[1] 15
```

The structure of this list -- `myList` -- is unique in that now we have
3 compartments where we can store different things. If you recall
subsetting vectors, you would use the bracket operator to obtain the
first element. In a list, using a single bracket gives you the specified
compartment. This "compartment" is actually a list holding the element
`"a"`.

```R
> myList[1]
[[1]]
[1] "a"
```

In order to access `"a"` itself, we need to use double brackets `[[]]`.

```R
> myList[[1]]
[1] "a"
```

Okay, now this is looking more familiar. We can store however many
things we want in here, as opposed to a vector where each space can only
hold one element.

```R
> myList[[1]] = seq(1,5,2)
> myList[[1]]
[1] 1 3 5
> myList
[[1]]
[1] 1 3 5

[[2]]
[1] TRUE

[[3]]
[1] 15
```

We can also name lists if we get tired of using double brackets for
subsetting everything.

```R
> myList <- list(one=10, two='b','haha')
> myList
$one
[1] 10

$two
[1] "b"

[[3]]
[1] "haha"
```

Now we can access 10 by using the name `one` instead of going
`myList[[1]]`. We use a shorthand dollar sign, or `$`. This becomes
extremely important once we start working with data frames, so remember
this!

```R
> myList$one
[1] 10

> myList$two
[1] "b"
```

## Matrices

Matrices in R are stored in column-major order, which means that you can
think of a matrix as a series of column vectors concatenated together.
This is why when you run the matrix() function,

```R
> myMatrix <- matrix(1:6, nrow=3, ncol=2)
     [,1] [,2]
[1,]    1    4
[2,]    2    5
[3,]    3    6
```

You can see that R fills the matrix column-first. If you want to fill it
by row, you simply pass the `byrow=T` argument to the function:

```R
# what did I do here?
> myMatrix <- matrix(1:6, c(3,2), byrow=T)
     [,1] [,2]
[1,]    1    2
[2,]    3    4
[3,]    5    6
```

One thing that's very useful to know when creating matrices in R is the
`rep()` function. This allows you to repeat a vector of your choice
however many times you want.

```R
> rep(1,3)
[1] 1 1 1

> rep(7,3)
[1] 7 7 7
```

Easy enough, right? So what if we want to create a matrix using these
two sequences? Let's build it together.

```R
> new_mat <- matrix(c(rep(1,3), rep(7,3)), 2, byrow=TRUE)
> new_mat
     [,1] [,2] [,3]
[1,]    1    1    1
[2,]    7    7    7
```

A hack-y way to deal with matrices is to just specify the dimension of
the matrix on your own. Right now, our matrix `new_mat` has the
dimension 2 by 3.

```R
> dim(new_mat)
[1] 2 3

> dim(new_mat) = c(3,2)
> new_mat
     [,1] [,2]
[1,]    1    7
[2,]    7    1
[3,]    1    7
```

After we change the dimension manually, R forces the matrix to fit the
specified dimension. Do you see why `new_mat` is the way it is? (Hint:
think in terms of columns!)

If you're feeling creative and don't want to rely on the matrix()
function, you can also use `rbind()` and `cbind()`. That is, you can
*row-bind* or *column-bind* vectors together.

```R
> rbind(1:2,3:4)
     [,1] [,2]
[1,]    1    2
[2,]    3    4

> cbind(1:2,3:4)
     [,1] [,2]
[1,]    1    3
[2,]    2    4
```

In this way, you don't have to worry about whether or not R will fill
the matrix by column or row -- you're the one in charge.

### Matrix Operations

Matrices aren't really useful if you can't do anything with them, so
let's go over some basic matrix manipulation techniques.

The previous ways of subsetting a vector can be generalized to a matrix.
Just remember conventional matrix notation (i.e. `[row, column]`) and
everything follows from there.

```R
> mat <- t(matrix(1:15,c(3,5)))
> mat
     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    4    5    6
[3,]    7    8    9
[4,]   10   11   12
[5,]   13   14   15

# obtain the 1st and 3rd rows of mat:
> mat[c(1,3),]
     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    7    8    9
```

Notice how we left the column entry blank. This tells R to fetch all the
elements of the given row(s). If we wanted only the 2nd and 3rd elements
of the 2nd row, what would we do?

```R
> mat[2,2:3]
[1] 5 6
```

Don't forget that we can also assign values to specified rows and/or
columns of a matrix. Let's say that we wanted to get rid of the last
column of the matrix and replace it with zeros. We could do something
like:

```R
> mat[,dim(mat)[2]] = 0
> mat
     [,1] [,2] [,3]
[1,]    1    2    0
[2,]    4    5    0
[3,]    7    8    0
[4,]   10   11    0
[5,]   13   14    0
```

To clarify, `dim(mat)` returns two values: 5 (# rows) and 3 (#
columns) respectively. `dim(mat)[2]` returns the 2nd value, or the
number of columns. This would also correspond to the last column.

To transpose a matrix, simply use the `t()` operator:

```R
> t.myMatrix <- t(myMatrix)
     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    2    4    6
```

Finding the inverse of a matrix involves "solving" it:

```R
> mat <- cbind(1:2, 3:4)
# do you know what mat looks like?

> solve(mat)
     [,1] [,2]
[1,]   -2  1.5
[2,]    1 -0.5

> solve(mat) %*% mat
     [,1] [,2]
[1,]    1    0
[2,]    0    1
#just as we expected!
```

The `row()` and `column()` functions return the original matrix but with
the corresponding row or column values replacing the original elements.
This is best illustrated with an example.

```R
> small <- mat[1:3,1:2]
> small
     [,1] [,2]
[1,]    1    2
[2,]    4    5
[3,]    7    8

> col(small)
     [,1] [,2]
[1,]    1    2
[2,]    1    2
[3,]    1    2

> row(small)
     [,1] [,2]
[1,]    1    1
[2,]    2    2
[3,]    3    3

```

Let's use this to create an upper-triangular matrix. This is a matrix
where all the elements below the diagonal are 0.

```R
> matr <- matrix(seq(1,18,2),c(3,3),byrow=T)
> matr
     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    7    9   11
[3,]   13   15   17
```

How do we start? Well, we need to set all values where the row is
greater than the column to 0.

```R
> matr[row(matr) > col(matr)] = 0
> matr
     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    0    9   11
[3,]    0    0   17

# Can you create a lower-triangular matrix using the same logic?
```

There are also built-in functions for means row- and column-wise.

```R
> colMeans(small)
[1] 4 5

> rowMeans(small)
[1] 1.5 4.5 7.5
```

The `diag()` function returns the diagonal elements of a matrix.

```R
> diag(matr)
[1]  1  9 17

> trace <- sum(diag(matr))
> trace
[1] 27
```

The `eigen()` function returns both the eigenvalues and the eigenvectors
of a matrix. Let's look at how this function works.

```R
> res <- eigen(matr)
> res
$values
[1] 17  9  1

$vectors
          [,1]      [,2] [,3]
[1,] 0.3180262 0.3511234    1
[2,] 0.7667481 0.9363292    0
[3,] 0.5576350 0.0000000    0
```

Let's say we wanted to obtain the product of all the eigenvalues and
multiply the eigenvectors by that scalar. How would we go about doing
that?  Let's start by using our trusty `$` operator.

```R
> vals <- res$values
> mult <- prod(vals)
> mult * res$vectors
          [,1]      [,2] [,3]
[1,]  48.65801  53.72189  153
[2,] 117.31245 143.25836    0
[3,]  85.31815   0.00000    0
```

### Note: The apply() family

Remember how I mentioned that there were functions called `colMeans()`
and `rowMeans()` to obtain the column and row means of a matrix? This
kind of matrix manipulation happens so often (in data frames too, which
we'll talk about in the next section) that there are special functions
in R for that exact purpose. They're a family of `apply()` functions,
which include `apply`, `tapply`, and `sapply` (among many
others!).

This family of functions is extremely important because they vectorize
operations that would otherwise have to be carried out in some form of a
loop, and loops run significantly slower in R than other traditional
programming languages. While they don't matter too much when you're
working with small datasets (like our mini-matrices), waiting for for
loops to finish running on large dataframes can be incredibly
time-consuming and unnecessary. Vectorization makes everything run a lot
faster!

Keep in mind that `1` refers to row, and `2` refers to column. The
parameterization is as follows: `apply(object, orientation, function)`.
"Apply" is used when you want to apply a function to a column or row of
a matrix.

```R
#this would be the row mean
> apply(matr,1,mean)
[1] 3.000000 6.666667 5.666667

#this is the column mean
> apply(matr,2,mean)
[1]  0.3333333  4.0000000 11.0000000
```

`sapply(object, function)` is used when you want to apply a function to
each element of a list, but want a simplified object in return (i.e.  a
vector as opposed to a list). So `sapply()` will try to simplify the
result whenever possible. Using `lapply()` with the same arguments
returns a list object every single time.

`tapply(object, split, function)` is used when you apply a function to
subsets of a vector, and the subsets are defined by some other vector
(like a factor). Wow okay that was confusing. What does that even mean?

This is something that we can illustrate better with dataframes in the
next section, but imagine that you have data on **height** split by both
**male** and **female**. You want to find the`*mean()` height, but want
to know the mean height for each gender. `tapply()` would give you a
nicely tabulated result.

To learn more about the apply() family of functions, visit this
[StackOverflow
question](http://stackoverflow.com/questions/3505701/r-grouping-functions-sapply-vs-lapply-vs-apply-vs-tapply-vs-by-vs-aggrega)

## Data

### Generating Data

The bulk of the analysis that you do in R will involve a dataset that
you already have, whether it's in the form of a .txt or .csv file. You
may even (heaven forbid) have to hard code in the values yourself. But
when you just want some practice or run into situations where data is
simply not available, simulating data can be incredibly useful.

R provides a bunch of functions to do exactly this for you. For example,
you can make a 10-element vector randomly drawn from a standard normal
distribution:

```R
# default is mean = 0 and sd = 1
> sim <- rnorm(10)
> print(sim)
 [1] -0.13878701  0.41765075  0.98175278 -0.39269536
 [5] -1.03966898  1.78222896 -2.31106908  0.87860458
 [9]  0.03580672  1.01282869
```

What about a Poisson distribution?

```R
# let's say lambda = 2
> pois_sim <- rpois(10,2)
> print(pois_sim)
[1] 2 3 0 0 3 4 1 3 3 6
```

So easy to do!  One thing to note, though, is that your results won't be
reproducible because these are **random** draws from the specified
distributions.

```$
# this is the uniform distribution from [0,1]
> runif(3)
[1] 0.41533309 0.06394917 0.49999883

> runif(3)
[1] 0.9890580 0.8123763 0.2896802
```
Once you have a set of values to work with, you can also sample from it
using the -- surprise -- `sample()` function.

```R
# we're taking a sample of 3 without replacement
# change FALSE to TRUE to sample with replacement
> sample(pois_sim,3,replace=FALSE)
[1] 1 6 3

> sample(pois_sim,3,replace=FALSE)
[1] 3 4 0
```

We can make our results reproducible in this case, though, if we use the
`set.seed(number)* function. If we provide our own unique value for
"number" as the function's argument, R will give us the same sample
every time.

```R
> set.seed(2)
> sample(pois_sim,3,replace=FALSE)
[1] 3 1 3

> set.seed(2)
> sample(pois_sim,3,replace=FALSE)
[1] 3 1 3
```

You'll notice that if you run the same `sample()` code consecutively
without running the `set.seed(2)` command, you'll get 2 different
samples. However, once the `set.seed(2)` function is run, R will give
you the same exact samples in the same order.

### 4.1 Factors

A factor is just R's way of organizing categorical (non-numeric)
variables. Let's say we have a vector with a bunch of eye colors.

```R
# these probably aren't human eyes...just sayin
> eyes = c("red", "white", "orange", "white", "purple", "red", "white", "orange", "purple")
> eyes
[1] "red"    "white"  "orange" "white"  "purple"
[6] "red"    "white"  "orange" "purple"
> class(eyes)
[1] "character"
```

Okay, so R thinks that the **eyes** variable is just another vector that
holds a bunch of character elements. But we know as smart people that
these colors represent four distinct categories, and that we'd
eventually like to tabulate our data according to these categories if
eye color ends up being important.

This is where factors come in.

```R
> eyecol = factor(eyes)
> eyecol
[1] red    white  orange white  purple red    white
[8] orange purple
Levels: orange purple red white
```

Now we have a new variable that has four **levels**, or categories!

```R
> levels(eyecol)
[1] "orange" "purple" "red"    "white"
```

This will prove to be really useful with data frames. We can also check
if certain variables are factors or not, and depending on the result, we
may have to do some data cleaning ourselves.

```R
> if(!is.factor(eyes)){
+ eyecol <- factor(eyes)
+ is.factor(eyecol)
+ }
[1] TRUE
```

Cool, now we can tabulate our data according to the different
categories. The **table()** function just takes a factor and counts up
all instances of a specific category, spitting out the end result.

```R
> table(eyecol)
eyecol
orange purple    red  white
     2      2      2      3
```

We can make this easier to read by viewing it as a proportion, as
opposed to a list of counts.

```R
> prop.table(table(eyecol))
eyecol
   orange    purple       red     white
0.2222222 0.2222222 0.2222222 0.3333333
```

We can also carry out basic operations on factors too, but many of them
don't make sense and will return NA's. More on this later.

### Data Frames

Ah, now we've finally reached data frames! This data type is super
important for all kinds of statistical analyses in R. Let's examine them
a little more carefully.

Data frames group a bunch of variables together into a single object
called a `data.frame`. It can take however many vectors of different
types (numeric, integer, character, factor, etc.) and organize them for
easy manipulation.

To make a data frame, the convention is:

```R
df = data.frame(var_1, var_2, ..., var_n)
```

where each "var_i" represents a vector. Let's actually try working with
some data now!

Normally you load in files from your working directory and go from
there.

```R
# This function returns the present working directory (pwd)
> getwd()
# Fill in the relevant variables
> setwd("~/Users/yourID/directory/something/else/maybe")
```

R is only able to see and access the files that are in your pwd, so if
you have `data.txt` in your Downloads folder but `getwd()` returns
something like `/Users/yourID/Desktop`, R won't be able to find your
file.

Let's pretend like we're in the proper directory. Normally, `.txt` files
separated by whitespace (` `) are read using `read.table()`, and `.csv`
files by `read.csv()`.

```R
# We have a file called data.txt apparently
> data <- read.table("data.txt", header=T)

# And another one called data2.csv
> data2 <- read.csv("data2.csv", header=F)
```

Now you can access the data frame using the `data` and `data2`
variables. The `header=T` argument tells you that each column of the
data frame has a name, which you can then use to subset/index the data
frame. If the file is separated using something else like commas, R has
separate functions/arguments for that. You should go find out what they
are :)

R has a bunch of built-in datasets, so let's just use one of them as an
example. You can access them using the `data()` function.

```R
> data(iris)
> names(iris)
[1] "Sepal.Length" "Sepal.Width"  "Petal.Length"
[4] "Petal.Width"  "Species"

> head(iris)
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          5.1         3.5          1.4         0.2  setosa
2          4.9         3.0          1.4         0.2  setosa
3          4.7         3.2          1.3         0.2  setosa
4          4.6         3.1          1.5         0.2  setosa
5          5.0         3.6          1.4         0.2  setosa
6          5.4         3.9          1.7         0.4  setosa

> str(iris)
'data.frame':	150 obs. of  5 variables:
 $ Sepal.Length: num  5.1 4.9 4.7 4.6 5 5.4 4.6 5 4.4 4.9 ...
 $ Sepal.Width : num  3.5 3 3.2 3.1 3.6 3.9 3.4 3.4 2.9 3.1 ...
 $ Petal.Length: num  1.4 1.4 1.3 1.5 1.4 1.7 1.4 1.5 1.4 1.5 ...
 $ Petal.Width : num  0.2 0.2 0.2 0.2 0.2 0.4 0.3 0.2 0.2 0.1 ...
 $ Species     : Factor w/ 3 levels "setosa","versicolor",..: 1 1 1 1 1 1 1 1 1 1 ...
```

There's a lot going on here. First, the `data()` function takes the
built-in "iris" dataset and saves it in a variable of the same name.
Then, we used the `names()` function to get a vector of all the column
names in the "iris" data frame. The `head()` function also gave us a
quick peek at the first six lines of the data frame, so that we wouldn't
need to trudge through lines and lines of data. Then the `str()`
function gives you an idea of the structure of the data -- the type of
each vector, some of the values, the dimensions of the dataset, etc. I'd
recommend these first three steps when starting any kind of analysis.

Side note: You can also find the dimensions of a data frame using the
`dim()` function.

So that's cool and all, but how do we access individual vectors within a
data frame? We use the dollar sign `$` operator. Then we can run some
basic statistics on it.

```R
> sep.len <- iris$Sepal.Length
> summary(sep.len)
   Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
  4.300   5.100   5.800   5.843   6.400   7.900
> mean(sep.len); sd(sep.len)
[1] 5.843333
[1] 0.8280661
```

Do you remember our friend `tapply()`? How would we calculate the mean
for sepal length and petal length by species?

```R
# Sepal length
> tapply(iris$Sepal.Length,iris$Species,mean)
    setosa versicolor  virginica
     5.006      5.936      6.588

#petal length
> tapply(iris$Petal.Length,iris$Species,mean)
    setosa versicolor  virginica
     1.462      4.260      5.552
```

Wow I really don't like typing all those variable names. There are two
options here. One, you can `attach()` the variable name of the data
after you first read it into R. So it would look something like
`attach(iris)`. Then, the column names of iris would be available in
your workspace for you to use freely without using the `$` operator.
However, I'd be careful about this option because it can cause a lot of
unnecessary clutter.

Another option is to use the `with()` function:

```R
> with(iris, tapply(Petal.Length,Species,mean))
    setosa versicolor  virginica
     1.462      4.260      5.552
```

If you feed in the name of the original data frame as the first
argument, you won't have to do any of the cumbersome accessing for the
function in the second argument.

Now onto the important question: how do we subset data frames?  You can
treat data frames as matrices in **certain situations only**, and this
is one of them. For example:

```R
# This is the first row of the iris dataset:
> iris[1,]
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          5.1         3.5          1.4         0.2  setosa

# This is the 1st and 3rd row, plus 2nd and 4th columns
> iris[c(1,3),c(2,4)]
  Sepal.Width Petal.Width
1         3.5         0.2
3         3.2         0.2
```

Or, let's say that you want all of the flowers that aren't "virginica."

```R
> cut <- iris[iris$Species != "virginica",]
> head(cut)
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          5.1         3.5          1.4         0.2  setosa
2          4.9         3.0          1.4         0.2  setosa
3          4.7         3.2          1.3         0.2  setosa
4          4.6         3.1          1.5         0.2  setosa
5          5.0         3.6          1.4         0.2  setosa
6          5.4         3.9          1.7         0.4  setosa
```

Note that when we subsetted the matrix, we had to include a comma ","
within the square brace. This tells R that we want the rows for which
that condition is true -- otherwise the operation wouldn't make sense.

There are also other subsetting functions, one of which is aptly named
`subset()`.

```R
> subset(iris,Sepal.Length>7.3)
    Sepal.Length Sepal.Width Petal.Length Petal.Width   Species
106          7.6         3.0          6.6         2.1 virginica
118          7.7         3.8          6.7         2.2 virginica
119          7.7         2.6          6.9         2.3 virginica
123          7.7         2.8          6.7         2.0 virginica
131          7.4         2.8          6.1         1.9 virginica
132          7.9         3.8          6.4         2.0 virginica
136          7.7         3.0          6.1         2.3 virginica

```

We can also **select()** which columns we want to see out of the
remaining results:

```R
    Sepal.Length Petal.Length
106          7.6          6.6
118          7.7          6.7
119          7.7          6.9
123          7.7          6.7
131          7.4          6.1
132          7.9          6.4
136          7.7          6.1
```

Oh, just a quick note about initializing data frames. One thing that can
get really annoying is when you try to initialize an empty data frame
and fill it as you go, but this is a bad idea. R will complain and get
mad.

```R
> fail = data.frame()
> fail
data frame with 0 columns and 0 rows
> a = seq(1:10)
> fail$a = a
Error in `$<-.data.frame`(`*tmp*`, "a", value = 1:10) :
  replacement has 10 rows, data has 0
```

## Simple Graphics

Visualizing your data is key before analysis! So to be perfectly honest,
the built-in graphics in R aren't all that pretty. Okay yeah, it's ugly.
If you're like me and enjoy looking at more aesthetically pleasing
things, I'd recommend looking into the `ggplot2`, `shiny`, and
`dplyr` packages. `ggplot2` was developed by Hadley Wickham of
RStudio, and the graphs you can make with that package put the default
graphics to shame. `shiny` takes that and makes everything interactive
on the web (omg). I've attached a link to a super cool ggplot2 cheat
sheet that I found the other day at the end of this tutorial -- you
should learn it and teach me ^^

### Histograms and Box plots

These are some of the standard visualization techniques you can use
(you'll have to do these on your own to see the output):

```R
# This shows a histogram of the data
> hist(sep.len)

# This gives you a box plot
> boxplot(sep.len)

#this is a correlation matrix of all the variables in the data
> pairs(data)

#stem and leaf plot if you're still into these
> stem(iris$Sepal.Width)

  The decimal point is 1 digit(s) to the left of the |

  20 | 0
  21 |
  22 | 000
  23 | 0000
  24 | 000
  25 | 00000000
  26 | 00000
  27 | 000000000
  28 | 00000000000000
  29 | 0000000000
  30 | 00000000000000000000000000
  31 | 00000000000
  32 | 0000000000000
  33 | 000000
  34 | 000000000000
  35 | 000000
  36 | 0000
  37 | 000
  38 | 000000
  39 | 00
  40 | 0
  41 | 0
  42 | 0
  43 |
  44 | 0
```

## Scatter Plots

Scatter plots are also easy to make in R. You simply take the `plot()`
function and plug in the appropriate arguments. I'll provide a few of
the arguments that I use a lot:

`plot(x, y, type, main, xlab, ylab)`:
- `x` = independent variable
- `y` = response variable
- `type` = `"l"` for line, `"p"` for points, `"b"` for both
- `main` = "Enter Title of Plot here"
- `xlab` = "Enter Title of X-Axis"
- `ylab` = "Enter Title of Y-Axis"

```R
# default is "p" for scatterplots so I didn't include it in here
> plot(iris$Sepal.Length,iris$Petal.Length,
       main="Petal vs. Sepal Length",
       xlab="Sepal Length", ylab="Petal Length")
```

You can also use the functions `line()` and `abline()` to draw out lines
on the plot directly.

## Basic Programming

You can also treat R as its own programming language and write scripts
to automate things for you.

### 6.1 Control Flow

The structure of `if`, `while`, and `for` loops are similar in R as it
is with other programming languages. For example, let's say we have a
vector and want to add 2 to each element. A roundabout way of doing this
using a for loop would be something like:

```R
> x <- 1:10
> for(i in 1:length(x)){
+ x[i] = x[i] + 2
+ }
> x
 [1]  3  4  5  6  7  8  9 10 11 14
```

An if statement would be:

```R
a = 2; b = -2
> if(a == b){
+   print("a and b are equal")
+ } else {print("a and b are not equal")
+ }
[1] "a and b are not equal"
```
Note the slightly awkward structuring of the if/else statement. This has
to do with the way that R interprets things line by line, so you have to
be careful with how you place your curly brackets.

### 6.2 Functions

This is how you would write a function in R.

```R
myfunc <- function(x){
  //do something here
  return(result)
}
```

Then you can call the function with your own argument. For example,

```R
> y <- seq(-1,1)
> y
[1] -1  0  1

> myfunc <- function(x) {
+ x = abs(x)
+ return(x)
+ }

> myfunc(y)
[1] 1 0 1
```

## Additional Resources

Along with this tutorial, there is a wealth of information available on R all across the web. Below are some good places to start:

- [ADI Resources](https://adicu.com/learn)
- [From the Creators of R](https://www.stat.auckland.ac.nz/~stat782/downloads/01-Basics.pdf)
- [Cool ggplot2 Cheat
  Sheet](https://www.rstudio.com/wp-content/uploads/2015/03/ggplot2-cheatsheet.pdf)
- [Kaggle Tutorial with R](https://trevorstephens.com/post/72916401642/titanic-getting-started-with-r)
- [UCLA Tutorial](https://www.ats.ucla.edu/stat/r/modules/)
- [DataCamp Tutorial](https://www.datacamp.com/courses/free-introduction-to-r)
