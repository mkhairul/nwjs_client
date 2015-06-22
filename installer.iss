; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "PACS"
#define MyAppVersion "0.0.1"
#define MyAppPublisher "KCSoft"
#define MyAppExeName "app.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{19E1E6F9-679F-42AE-90D3-68F38311AEDB}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={pf}\{#MyAppName}
DefaultGroupName={#MyAppName}
OutputBaseFilename=pacs_setup
OutputDir=.
Compression=lzma
SolidCompression=yes

[Code]
procedure RunOtherInstaller;
var
  ResultCode: Integer;
begin
  if not Exec(ExpandConstant('{app}\CP210x_VCP_Win7.exe'), '', '', SW_SHOWNORMAL,
    ewWaitUntilTerminated, ResultCode)
  then
    MsgBox('Other installer failed to run!' + #13#10 +
      SysErrorMessage(ResultCode), mbError, MB_OK);
end;

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "D:\UniServer\www\rfid_client\exec\app.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\UniServer\www\rfid_client\exec\CP210x_VCP_Win7.exe"; DestDir: "{app}"; Flags: ignoreversion; AfterInstall: RunOtherInstaller
Source: "D:\UniServer\www\rfid_client\exec\ffmpegsumo.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\UniServer\www\rfid_client\exec\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\UniServer\www\rfid_client\exec\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\UniServer\www\rfid_client\exec\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\UniServer\www\rfid_client\exec\nw.pak"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

