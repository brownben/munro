from ..utils.helpers import *


class Test_toInt:
    def test_returnsZeroIfNoNumber(self) -> None:
        assert toInt("") == 0

    def test_convertsStringToInteger(self) -> None:
        assert toInt("-1") == -1
        assert toInt("0") == 0
        assert toInt("4") == 4
        assert toInt("10") == 10
        assert toInt("126") == 126
