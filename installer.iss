; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "PACS"
#define MyAppVersion "0.0.1"
#define MyAppPublisher "KCSoft"
#define MyAppExeName "nw.exe"

[Registry]
Root: HKLM; Subkey: "SYSTEM\CurrentControlSet\Control\Session Manager\Environment"; ValueType: string; ValueName: "PATH"; ValueData: "{olddata};{app}"; AfterInstall: RefreshEnvironment;
; Root: HKLM; Subkey: "SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers\"; ValueType: String; ValueName: "{app}\nw.exe"; ValueData: "RUNASADMIN"; Flags: uninsdeletekeyifempty uninsdeletevalue;

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
PrivilegesRequired=admin

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
const
  SMTO_ABORTIFHUNG = 2;
  WM_WININICHANGE = $001A;
  WM_SETTINGCHANGE = WM_WININICHANGE;

type
  WPARAM = UINT_PTR;
  LPARAM = INT_PTR;
  LRESULT = INT_PTR;

function SendTextMessageTimeout(hWnd: HWND; Msg: UINT;
  wParam: WPARAM; lParam: PAnsiChar; fuFlags: UINT;
  uTimeout: UINT; out lpdwResult: DWORD): LRESULT;
  external 'SendMessageTimeoutA@user32.dll stdcall';  

procedure RefreshEnvironment;
var
  S: AnsiString;
  MsgResult: DWORD;
begin
  S := 'Environment';
  SendTextMessageTimeout(HWND_BROADCAST, WM_SETTINGCHANGE, 0,
    PAnsiChar(S), SMTO_ABORTIFHUNG, 5000, MsgResult);
end;

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
; Source: "exec\app.exe"; DestDir: "{app}"; Flags: ignoreversion
; Source: "exec\dist\*"; DestDir: "{app}\dist"; Flags: ignoreversion
; Source: "exec\reader\*"; DestDir: "{app}\reader"; Flags: ignoreversion
; Source: "exec\node_modules\*"; DestDir: "{app}\node_modules"; Flags: ignoreversion
Source: "exec\dist\*"; DestDir: "{app}\dist"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "exec\reader\*"; DestDir: "{app}\reader"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "exec\node_modules\*"; DestDir: "{app}\node_modules"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "exec\CP210x_VCP_Win7.exe"; DestDir: "{app}"; Flags: ignoreversion; AfterInstall: RunOtherInstaller
Source: "exec\ffmpegsumo.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\nw.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\nw.exe"; DestDir: "{app}"; Flags: ignoreversion 
Source: "exec\MSVCP71.DLL"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\msvcr71.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "exec\package.json"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent runascurrentuser

