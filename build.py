from subprocess import call

call('7z a -tzip -x!*.git* -x!*exec* -x!*Output* -x!build.py -x!installer.iss -x!settings -x!pacs_setup.exe app.nw *', shell=True)
call('move /Y app.nw exec/', shell=True)
call('copy /Y /b exec\\nw.exe+exec\\app.nw exec\\app.exe', shell=True)
call('iscc installer.iss', shell=True)
