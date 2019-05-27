import sys
sys.path.append('C:\\Users\\awang14\\Desktop\Merlin\\PyBaseAutoTest - bk')
from viewpoint.tests.base_test import BaseTestCase
import viewpoint.lib.viewpoint_globalvar as gl


class TestWorkflow01(BaseTestCase):
    def test_button_size(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        gl.get_value_csv('BAT_SE')
        util.openPage()
        assert util.getElementProperty(
            'Button1', 'FontSize') == 13, "Font size on homepage should be 13"
