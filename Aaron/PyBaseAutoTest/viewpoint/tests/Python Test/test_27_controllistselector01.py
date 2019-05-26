from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow27(BaseTestCase):
    def test_cls01(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()

        util.navigateByButton('Button5')
        # Set indicator highlight
        util.setElementProperty('ControlListSelector1', 'SelectedBulletIndex', 0, isDigit=True)
        assert util.waitDisplayUpdate('ControlListSelector1', 'SelectedBulletIndex', 0)

        # Select one item in controllistselector then click enter.
        util.setElementProperty('ControlListSelector1', 'SelectedIndex', 2, isDigit=True)
        # Check the indicator ahead of selected value.
        assert util.waitDisplayUpdate('ControlListSelector1', 'SelectedBulletIndex', 2)
        assert util.waitDisplayUpdate('ControlListSelector1', "m_selectedItem.m_Caption", '2222')

        for num in range(0, 5, 1):
            num1 = '%s%s%s%s' % (num, num, num, num)
            util.setElementProperty('NumericInput1', 'Caption', num, isDigit=True)

            assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', str(num))
            # Check the indicator ahead of selected value.
            assert util.waitDisplayUpdate('ControlListSelector1', 'SelectedBulletIndex', num)
            assert util.waitDisplayUpdate('ControlListSelector1', "m_selectedItem.m_Caption", num1)


