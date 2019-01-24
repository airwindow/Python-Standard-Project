from coolPro.app.module2.print_funs import print_sth

def test_print_fun():
	print_sth('hello from pytest')

def test_equal_to_one(x=1):
	assert 1 == x

def test_equal_to_two(x=2):
	assert 1 == x

def test_equal_to_three(x=3):
	assert 1 == x

def test_equal_to_four(x=4):
	assert 1 == x
