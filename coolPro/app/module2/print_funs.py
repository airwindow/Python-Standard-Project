def print_sth(s):
	print('print from module2: {}'.format(s))


if __name__ == "__main__":
	s = 'test in main'
	print_sth(s)