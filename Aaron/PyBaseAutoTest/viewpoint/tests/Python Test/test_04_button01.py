from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow04(BaseTestCase):
    def setTagTo0(self, util):
        while True:
            current = int(util.getElementProperty('NumericDisplay1', 'DisplayText'))
            if current == 0:
                return True
            util.clickVPButton('MultistatePushButton1')
            util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', str((current + 1) % 4))
        return False

    def test_button1(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()
        util.navigateByButton('Button1')

        assert self.setTagTo0(util), "Tag value should be 0"

        util.clickVPButton('Button1')
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', '1'), "Tag value should be 1"
