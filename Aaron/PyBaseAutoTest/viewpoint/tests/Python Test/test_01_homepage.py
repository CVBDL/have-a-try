import pytest
import sys
sys.path.append('.')
from viewpoint.tests.base_test import BaseTestCase
from viewpoint.lib.viewpoint_global import Global
from viewpoint.lib.viewpoint_solution import get_value_csv


@pytest.fixture(scope='module')
def init_global():
    Global().caseName = "BAT_SE"
    Global().initDisplay = get_value_csv(Global().caseName)


@pytest.mark.usefixtures("init_global", "publish_application", "util")
class TestWorkflow01(BaseTestCase):
    def test_button_size(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        util.openPage()
        assert util.getElementProperty(
            'Button1', 'FontSize') == 13, "Font size on homepage should be 13"
