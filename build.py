from subprocess import call

#call('7z a -tzip -x!*.git* -x!*exec* -x!*Output* -x!build.py -x!installer.iss -x!settings -x!pacs_setup.exe app.nw *', shell=True)
call('mkdir exec\\dist', shell=True) # New
call('mkdir exec\\reader', shell=True)
call('mkdir exec\\node_modules', shell=True)
call('xcopy /Y dist exec\\dist /s /e', shell=True) # New
call('xcopy /Y reader exec\\reader /s /e', shell=True) # New
call('xcopy /Y node_modules exec\\node_modules /s /e', shell=True) # New
call('xcopy /Y package.json exec', shell=True) # New
#call('move /Y app.nw exec/', shell=True)
#call('copy /Y /b exec\\nw.exe+exec\\app.nw exec\\app.exe', shell=True)
call('iscc installer.iss', shell=True)
