from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow05(BaseTestCase):
    def test_button2(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()
        util.navigateByButton('Button4')

        util.pressVPButton('Button1')
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', '6')

        util.releaseVPButton('Button1')
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', '8')

        util.pressVPButton('Button2')
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', '10')

        util.releaseVPButton('Button2')
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', '11')

        util.clickVPButton('Button3')
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', '100')
