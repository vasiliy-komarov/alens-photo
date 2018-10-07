import subprocess

subprocess.check_call('node server.js', shell=True)
subprocess.check_output('node server.js', shell=True)
