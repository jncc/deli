
import * as React from "react";
import { Button, Icon } from 'semantic-ui-react'

export function Example(props: any) {
  return (
<div>
    <Button animated={'vertical'} title="hello">
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>

    <Button animated='vertical'>
      <Button.Content hidden>Shop</Button.Content>
      <Button.Content visible>
        <Icon name='shop' />
      </Button.Content>
    </Button>

    <Button animated='fade'>
      <Button.Content visible>
        Sign-up for a Pro account
      </Button.Content>
      <Button.Content hidden>
        $12.99 a month
      </Button.Content>
    </Button>
  </div>  );
}