# Requirements

- To realize three different kind of status signals

1. Success (green)
2. Warning (Orange)
3. Fail (Red)

- Three different buttons to toggle status

1. Turn to success
2. Turn to warning
3. Turn to fail

# Design a factory

- To have factory with following Structure
  - factory class:
    1. parameters: DOM(bind events and props), status(current status)
    2. create: create a new instance
  - Signal class:
    1. base class: have the signal
    2. Sub class: to inherit all the attributes and methods, and have some customized props and methods.
