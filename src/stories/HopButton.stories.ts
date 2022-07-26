import HopButton, { Props } from '../components/HopButton.vue';
import { Story, Meta } from '@storybook/vue3';

export default {
  title: 'HopButton',
  component: HopButton,
} as Meta;

const Template: Story<Props> = (arg) => ({
  components: { HopButton },
  setup() {
    return { arg };
  },
  template: '<HopButton v-bind="arg" />',
});

export const Default = Template.bind({});

export const other = Template.bind({});
other.args = { understand: 'TypeScript' };
