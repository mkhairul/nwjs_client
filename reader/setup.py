from distutils.core import setup
import py2exe
setup(
    console=[{"script":"rfid.py"}],
    data_files=[('.',['EMR300DLL.dll'])],
)