from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow17(BaseTestCase):
    def test_localmsg01(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()
        util.navigateByButton('Button6')

        for num in range(1, 6, 1):
            msg = 'This is message %s.' % num
            util.setElementProperty('NumericInput1', 'Caption', num, isDigit=True)

            assert util.waitDisplayUpdate('LocalMessageDisplay1', 'DisplayValue', msg)
