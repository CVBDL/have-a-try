from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow02(BaseTestCase):
    def test_text_caption(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()
        util.navigateByButton('Button2')

        assert util.getElementProperty('Text1', 'Caption') == 'Hello world', "Caption should be \"Hello world\""
