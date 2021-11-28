/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { Logo } from 'components/Logo';
import YouWillLearnCard from 'components/MDX/YouWillLearnCard';
import * as React from 'react';

function HomepageHero() {
  return (
    <>
      <div className="mt-8 lg:mt-10 mb-0 sm:mt-8 sm:mb-8 lg:mb-6 flex-col sm:flex-row flex flex-grow items-start sm:items-center justify-start mx-auto max-w-4xl">
        <Logo className="text-link dark:text-link-dark w-20 sm:w-28 mr-4 mb-4 sm:mb-0 h-auto" />
        <div className="flex flex-wrap">
          <h1 className="text-5xl mr-4 -mt-1 flex wrap font-bold leading-tight text-primary dark:text-primary-dark">
            ReactUnity Docs
          </h1>
        </div>
      </div>
      <section className="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col justify-center">
          <YouWillLearnCard title="Learn ReactUnity" path="/learn">
            <p>
              Learn how to use ReactUnity with tutorials step-by-step.
            </p>
          </YouWillLearnCard>
        </div>
        <div className="flex flex-col justify-center">
          <YouWillLearnCard title="API Reference" path="/reference">
            <p>
              Look up the features of ReactUnity, and see how they work in live code examples.
            </p>
          </YouWillLearnCard>
        </div>
      </section>
    </>
  );
}

export default HomepageHero;
