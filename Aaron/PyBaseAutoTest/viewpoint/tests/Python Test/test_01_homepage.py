from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow01(BaseTestCase):
    def test_button_size(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()
        assert util.getElementProperty('Button1', 'FontSize') == 13, "Font size on homepage should be 13"
