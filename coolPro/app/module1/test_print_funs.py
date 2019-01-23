from ..module2.print_funs import print_sth

def test_funs_from_other_modules(s):
	print_sth(s)

if __name__ == "__main__":
	s = 'test in main'
	test_funs_from_other_modules(s)