from setuptools import setup

setup(
	name='ipfs-datasets',
	version='0.0.1',
	packages=[
		'ipfs_datasets',
	],
	install_requires=[
        'ipfs_kit@git+https://github.com/endomorphosis/ipfs_kit.git',
		'datasets',
		'urllib3',
		'requests',
		'boto3',
	]
)