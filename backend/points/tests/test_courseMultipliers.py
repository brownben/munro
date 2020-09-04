from ..courseMultipliers import getMultiplier


class Test_getMultiplier:
    def test_runningStandardCourse(self):
        assert getMultiplier("M10", "YELLOW") == 1000
        assert getMultiplier("W12", "ORANGE") == 1000
        assert getMultiplier("M14", "LIGHT GREEN") == 1000
        assert getMultiplier("W16", "GREEN") == 1000
        assert getMultiplier("M18", "Brown") == 1000
        assert getMultiplier("W20", "BLUE") == 1000
        assert getMultiplier("M21", "BROWN") == 1000
        assert getMultiplier("W35", "BLUE") == 1000
        assert getMultiplier("M40", "BROWN") == 1000
        assert getMultiplier("W45", "SHORT BLUE") == 1000
        assert getMultiplier("M50", "SHORT BROWN") == 1000
        assert getMultiplier("W55", "GREEN") == 1000
        assert getMultiplier("M60", "BLUE") == 1000
        assert getMultiplier("W65", "SHORT GREEN") == 1000
        assert getMultiplier("M70", "GREEN") == 1000
        assert getMultiplier("W75", "SHORT GREEN") == 1000
        assert getMultiplier("M80", "SHORT GREEN") == 1000

    def test_runningUp(self):
        assert getMultiplier("W10", "ORANGE") == 1200
        assert getMultiplier("M12", "LIGHT GREEN") == 1200
        assert getMultiplier("W14", "GREEN") == 1210
        assert getMultiplier("M16", "BROWN") == 1210
        assert getMultiplier("W18", "BLACK") == 1452
        assert getMultiplier("M20", "BLACK") == 1200
        assert getMultiplier("W21", "BLACK") == 1200
        assert getMultiplier("M35", "BLACK") == 1200
        assert getMultiplier("W40", "BROWN") == 1210
        assert getMultiplier("M45", "BROWN") == 1100
        assert getMultiplier("W50", "BROWN") == 1331
        assert getMultiplier("M55", "SHORT BROWN") == 1100
        assert getMultiplier("W60", "SHORT BLUE") == 1100
        assert getMultiplier("M65", "BROWN") == 1331
        assert getMultiplier("W70", "BLUE") == 1331
        assert getMultiplier("M75", "GREEN") == 1100
        assert getMultiplier("W80", "BLACK") == 1933

    def test_badAgeClass(self):
        assert getMultiplier("W", "BROWN") == 1000
        assert getMultiplier("M", "BROWN") == 1000
        assert getMultiplier("WA", "BROWN") == 1000
        assert getMultiplier("MWERR", "BROWN") == 1000
        assert getMultiplier("", "BROWN") == 1000
